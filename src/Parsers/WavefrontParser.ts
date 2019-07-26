import { Resource, ResourceType, Exception } from '../Core';
import { VertexAttribute, DataType } from '../GL/Helpers';
import { Indexable, TextReader } from '../Core/Helpers';
import { Vector2, Vector3, Vector4 } from '../Math';

enum Token {
	Vertex = 'v',
	Normal = 'vn',
	Texcoord = 'vt',
	Face = 'f'
}

interface Raw {
	readonly [Token.Vertex]: number[];
	readonly [Token.Normal]: number[];
	readonly [Token.Texcoord]: number[];

	readonly [token: string]: number[];
}

export class Vertex implements Indexable<VertexAttribute> {
	public readonly position: VertexAttribute<Vector3>;
	public readonly normal: VertexAttribute<Vector3>;
	public readonly texcoord: VertexAttribute<Vector2>;

	public constructor(position: Vector3, normal: Vector4, texcoord: Vector2) {
		this.position = new VertexAttribute<Vector3>(position, DataType.Float32, false);
		this.normal = new VertexAttribute<Vector4>(normal, DataType.Int8, true);
		this.texcoord = new VertexAttribute<Vector2>(texcoord, DataType.Int16, false);
	}

	readonly [index: string]: VertexAttribute;
}

class WavefrontParser {
	private readonly raw: Raw = {
		[Token.Vertex]: [],
		[Token.Normal]: [],
		[Token.Texcoord]: [],
	};

	public readonly vertices: Vertex[] = [];
	public readonly indices: number[] = [];

	private readonly hash: Indexable<number> = {}; // @todo Make this (and possibly others) `HashSet`-like

	private index: number = 0;

	public async load(path: string): Promise<void> {
		let reader: TextReader;

		try {
			reader = await Resource.load<TextReader>(path, ResourceType.OBJ);
		} catch (e) {
			throw new Exception(`WavefrontParser: failed to load '${ path }'`, e);
		}

		for (let line of reader) {
			if (line[0] === '#') {
				continue;
			}

			const parts: string[] = line.split(' ');
			const token: Token = parts.shift() as Token;

			switch (token) {
				case Token.Vertex:
				case Token.Normal:
				case Token.Texcoord:
					this.raw[token].push(...parts.map((part: string): number => +part));
					break;

				case Token.Face:
					this.parse(parts);
					break;
			}
		}
	}

	private parse(parts: string[]): void {
		for (let i = 0; i < 3; i++) {
			const face: string = parts[i];

			if (face in this.hash) {
				this.indices.push(this.hash[face]);
				continue;
			}

			const x: number[] = face.split('/').map((v: string): number => ((+v) - 1));

			// noinspection PointlessArithmeticExpressionJS
			const position = new Vector3(
				this.raw[Token.Vertex][(x[0] * 3) + 0],
				this.raw[Token.Vertex][(x[0] * 3) + 1],
				this.raw[Token.Vertex][(x[0] * 3) + 2],
			);

			// noinspection PointlessArithmeticExpressionJS
			const texcoord = new Vector2(
				this.raw[Token.Texcoord][(x[1] * 2) + 0],
				this.raw[Token.Texcoord][(x[1] * 2) + 1],
			);

			// noinspection PointlessArithmeticExpressionJS
			const normal = new Vector4(
				this.raw[Token.Normal][(x[2] * 3) + 0],
				this.raw[Token.Normal][(x[2] * 3) + 1],
				this.raw[Token.Normal][(x[2] * 3) + 2],
				0,
			);

			this.hash[face] = this.index;

			this.vertices.push(new Vertex(position, normal, texcoord));
			this.indices.push(this.index);

			this.index += 1;
		}
	}
}

export default WavefrontParser;