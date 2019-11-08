import 'reflect-metadata';

import Metadata from './Metadata';

interface RangeMetadata {
	min: number;
	max: number;
	step: number;
}

export const range = (metadata: RangeMetadata): Metadata => {
	return Reflect.metadata(Range.SYMBOL, metadata) as Metadata;
};

class Range implements RangeMetadata {
	public static readonly SYMBOL: string = 'cake:range';

	public readonly min: number;
	public readonly max: number;
	public readonly step: number;

	private constructor(min: number, max: number, step: number) {
		this.min = min;
		this.max = max;
		this.step = step;
	}

	public static get(target: any, property: string): Range {
		const {
			min,
			max,
			step,
		} = Reflect.getMetadata(Range.SYMBOL, target, property) as RangeMetadata;

		return new Range(min, max, step);
	};

	public static all(target: any): Range[] {
		const result: Range[] = [];

		for (let property in target) {
			if (target.hasOwnProperty(property)) {
				if (Reflect.hasMetadata(Range.SYMBOL, target, property)) {
					result.push(Range.get(target, property));
				}
			}
		}

		return result;
	}
}

export default Range;