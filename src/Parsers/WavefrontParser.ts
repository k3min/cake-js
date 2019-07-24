import { DataType, VertexAttribute } from '../GL/Helpers';
import { Indexable, TextReader, Resource, ResourceType } from '../Helpers';
import { Vector2, Vector3 } from '../Math';

enum Token {
	Vertex = 'v',
	Texcoord = 'vt',
	Normal = 'vn',
	Face = 'f'
}

interface Raw {
	readonly [Token.Vertex]: number[];
	readonly [Token.Texcoord]: number[];
	readonly [Token.Normal]: number[];

	readonly [token: string]: number[];
}

export class Vertex implements Indexable<VertexAttribute> {
	public readonly position: VertexAttribute<Vector3>;
	public readonly texcoord: VertexAttribute<Vector2>;
	public readonly normal: VertexAttribute<Vector3>;

	public constructor(position: Vector3, texcoord: Vector2, normal: Vector3) {
		this.position = new VertexAttribute<Vector3>(position);
		this.texcoord = new VertexAttribute<Vector2>(texcoord, DataType.Int8, true);
		this.normal = new VertexAttribute<Vector3>(normal, DataType.Uint16, true);
	}

	readonly [index: string]: VertexAttribute;
}

class WavefrontParser {
	private readonly raw: Raw = {
		[Token.Vertex]: [],
		[Token.Texcoord]: [],
		[Token.Normal]: [],
	};

	public readonly vertices: Vertex[] = [];
	public readonly indices: number[] = [];

	private readonly hash: Indexable<number> = {};

	private index: number = 0;

	public async load(path: string): Promise<void> {
		const reader: TextReader = await Resource.load<TextReader>(path, ResourceType.OBJ);

		for (let line of reader) {
			const parts: string[] = line.split(' ');
			const token: Token = parts.shift() as Token;

			switch (token) {
				case Token.Vertex:
				case Token.Texcoord:
				case Token.Normal:
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
			const normal = new Vector3(
				this.raw[Token.Normal][(vertex[2] * 3) + 0],
				this.raw[Token.Normal][(vertex[2] * 3) + 1],
				this.raw[Token.Normal][(vertex[2] * 3) + 2],
			);

			this.hash[face] = this.index;

			this.vertices.push(new Vertex(position, texcoord, normal));
			this.indices.push(this.index);

			this.index += 1;
		}
	}
}

export default WavefrontParser;