class Quaternion extends Float32Array {
	public constructor() {
		super(4);
	}

	public static euler(euler: ArrayLike<number>, result: Quaternion): Quaternion {
		const cr = Math.cos(euler[0] * 0.5);
		const sr = Math.sin(euler[0] * 0.5);
		const cp = Math.cos(euler[1] * 0.5);
		const sp = Math.sin(euler[1] * 0.5);
		const cy = Math.cos(euler[2] * 0.5);
		const sy = Math.sin(euler[2] * 0.5);

		result[0] = cy * cp * sr - sy * sp * cr;
		result[1] = sy * cp * sr + cy * sp * cr;
		result[2] = sy * cp * cr - cy * sp * sr;
		result[3] = cy * cp * cr + sy * sp * sr;

		return result;
	}
}

export default Quaternion;