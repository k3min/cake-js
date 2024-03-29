import { Resource, ResourceType, Exception } from '../Core';
import { DataType, vertexAttribute } from '../GL/Helpers';
import { Indexable, TextReader } from '../Core/Helpers';
import { Vector2, Vector3, Vector4 } from '../Math';

export class Vertex implements Indexable<ArrayLike<number>> {
	@vertexAttribute({ location: 0, type: DataType.Float32, normalized: false })
	public readonly position: Vector3;

	@vertexAttribute({ location: 1, type: DataType.Int8, normalized: true })
	public readonly normal: Vector3;

	@vertexAttribute({ location: 2, type: DataType.Int16, normalized: false })
	public readonly texcoord: Vector2;

	public constructor(position: Vector3, normal: Vector4, texcoord: Vector2) {
		this.position = position;
		this.normal = normal;
		this.texcoord = texcoord;
	}

	readonly [index: string]: ArrayLike<number>;
}

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

			const vertex: number[] = face.split('/').map((v: string): number => ((+v) - 1));

			// noinspection PointlessArithmeticExpressionJS
			const position = new Vector3(
				this.raw[Token.Vertex][(vertex[0] * 3) + 0],
				this.raw[Token.Vertex][(vertex[0] * 3) + 1],
				this.raw[Token.Vertex][(vertex[0] * 3) + 2],
			);

			// noinspection PointlessArithmeticExpressionJS
			const texcoord = new Vector2(
				this.raw[Token.Texcoord][(vertex[1] * 2) + 0],
				this.raw[Token.Texcoord][(vertex[1] * 2) + 1],
			);

			// noinspection PointlessArithmeticExpressionJS
			const normal = new Vector4(
				this.raw[Token.Normal][(vertex[2] * 3) + 0],
				this.raw[Token.Normal][(vertex[2] * 3) + 1],
				this.raw[Token.Normal][(vertex[2] * 3) + 2],
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