/*!
 *
 * A javascript module that provides fast interpolation functions
 *
 * @name	FastInterpolation
 * @type	Javascript Module
 * @author	Guilherme Rossato
 * @year	2017
 * @licence	The Unlicense:  http://unlicense.org/  (no warranties, free to do use / edit / share / sell / claim)
 *
 * Usage Example:
 * Given the points (2,4), (3,6), (4,8), determine y-value for x=6 [y expected to be 12]
 *	FastInterpolation.quadratic(2,4,3,6,4,8, 6); // Original, fastest
 *	FastInterpolation.degree2(2,4,3,6,4,8, 6); // Original, just as fast as the other
 *	FastInterpolation.any(2,4,3,6,4,8, 6); // Uses argument length to figure degree
 *	FastInterpolation.any(2,4,3,6,4,8).at(6); // Figures you sent 6 pairs of (x,y) and gives you an object with .at to evaluate.
 */

const FastInterpolation = (function() {
	let linear = function(x0, y0, x1, y1, x) {
		// (verbose): return b(y0, y1, ib(x0, x1, x))
		return (x * y0 - x1 * y0 - x * y1 + x0 * y1) / (x0 - x1);
	}
	let quadratic = function(x0, y0, x1, y1, x2, y2, x) {
		// (verbose): return b(b(y0, y1, ib(x0, x1, x)), b(y1, y2, ib(x1, x2, x)), ib(x0, x2, x))
		// (raw)	: return (x*x*x1*y0-x*x1*x1*y0-x*x*x2*y0+x1*x1*x2*y0+x*x2*x2*y0-x1*x2*x2*y0-x*x*x0*y1+x*x0*x0*y1+x*x*x2*y1-x0*x0*x2*y1-x*x2*x2*y1+x0*x2*x2*y1+x*x*x0*y2-x*x0*x0*y2-x*x*x1*y2+x0*x0*x1*y2+x*x1*x1*y2-x0*x1*x1*y2)/(x0*x0*x1-x0*x1*x1-x0*x0*x2+x1*x1*x2+x0*x2*x2-x1*x2*x2);
		let x_2 = x * x
		  , x0_2 = x0 * x0
		  , x1_2 = x1 * x1
		  , x2_2 = x2 * x2;
		return (x_2*x1*y0-x*x1_2*y0-x_2*x2*y0+x1_2*x2*y0+x*x2_2*y0-x1*x2_2*y0-x_2*x0*y1+x*x0_2*y1+x_2*x2*y1-x0_2*x2*y1-x*x2_2*y1+x0*x2_2*y1+x_2*x0*y2-x*x0_2*y2-x_2*x1*y2+x0_2*x1*y2+x*x1_2*y2-x0*x1_2*y2)/(x0_2*x1-x0*x1*x1-x0_2*x2+x1_2*x2+x0*x2_2-x1*x2_2);
	}
	let cubic = function(x0, y0, x1, y1, x2, y2, x3, y3, x) {
		// (verbose): return b(b(b(y0, y1, ib(x0, x1, x)), b(y1, y2, ib(x1, x2, x)), ib(x0, x2, x)),b(b(y1, y2, ib(x1, x2, x)), b(y2, y3, ib(x2, x3, x)), ib(x1, x3, x)),ib(x0, x3, x))
		// (raw)	: return (x*x*x*x1*x1*x2*y0-x*x*x1*x1*x1*x2*y0-x*x*x*x1*x2*x2*y0+x*x1*x1*x1*x2*x2*y0+x*x*x1*x2*x2*x2*y0-x*x1*x1*x2*x2*x2*y0-x*x*x*x1*x1*x3*y0+x*x*x1*x1*x1*x3*y0+x*x*x*x2*x2*x3*y0-x1*x1*x1*x2*x2*x3*y0-x*x*x2*x2*x2*x3*y0+x1*x1*x2*x2*x2*x3*y0+x*x*x*x1*x3*x3*y0-x*x1*x1*x1*x3*x3*y0-x*x*x*x2*x3*x3*y0+x1*x1*x1*x2*x3*x3*y0+x*x2*x2*x2*x3*x3*y0-x1*x2*x2*x2*x3*x3*y0-x*x*x1*x3*x3*x3*y0+x*x1*x1*x3*x3*x3*y0+x*x*x2*x3*x3*x3*y0-x1*x1*x2*x3*x3*x3*y0-x*x2*x2*x3*x3*x3*y0+x1*x2*x2*x3*x3*x3*y0-x*x*x*x0*x0*x2*y1+x*x*x0*x0*x0*x2*y1+x*x*x*x0*x2*x2*y1-x*x0*x0*x0*x2*x2*y1-x*x*x0*x2*x2*x2*y1+x*x0*x0*x2*x2*x2*y1+x*x*x*x0*x0*x3*y1-x*x*x0*x0*x0*x3*y1-x*x*x*x2*x2*x3*y1+x0*x0*x0*x2*x2*x3*y1+x*x*x2*x2*x2*x3*y1-x0*x0*x2*x2*x2*x3*y1-x*x*x*x0*x3*x3*y1+x*x0*x0*x0*x3*x3*y1+x*x*x*x2*x3*x3*y1-x0*x0*x0*x2*x3*x3*y1-x*x2*x2*x2*x3*x3*y1+x0*x2*x2*x2*x3*x3*y1+x*x*x0*x3*x3*x3*y1-x*x0*x0*x3*x3*x3*y1-x*x*x2*x3*x3*x3*y1+x0*x0*x2*x3*x3*x3*y1+x*x2*x2*x3*x3*x3*y1-x0*x2*x2*x3*x3*x3*y1+x*x*x*x0*x0*x1*y2-x*x*x0*x0*x0*x1*y2-x*x*x*x0*x1*x1*y2+x*x0*x0*x0*x1*x1*y2+x*x*x0*x1*x1*x1*y2-x*x0*x0*x1*x1*x1*y2-x*x*x*x0*x0*x3*y2+x*x*x0*x0*x0*x3*y2+x*x*x*x1*x1*x3*y2-x0*x0*x0*x1*x1*x3*y2-x*x*x1*x1*x1*x3*y2+x0*x0*x1*x1*x1*x3*y2+x*x*x*x0*x3*x3*y2-x*x0*x0*x0*x3*x3*y2-x*x*x*x1*x3*x3*y2+x0*x0*x0*x1*x3*x3*y2+x*x1*x1*x1*x3*x3*y2-x0*x1*x1*x1*x3*x3*y2-x*x*x0*x3*x3*x3*y2+x*x0*x0*x3*x3*x3*y2+x*x*x1*x3*x3*x3*y2-x0*x0*x1*x3*x3*x3*y2-x*x1*x1*x3*x3*x3*y2+x0*x1*x1*x3*x3*x3*y2-x*x*x*x0*x0*x1*y3+x*x*x0*x0*x0*x1*y3+x*x*x*x0*x1*x1*y3-x*x0*x0*x0*x1*x1*y3-x*x*x0*x1*x1*x1*y3+x*x0*x0*x1*x1*x1*y3+x*x*x*x0*x0*x2*y3-x*x*x0*x0*x0*x2*y3-x*x*x*x1*x1*x2*y3+x0*x0*x0*x1*x1*x2*y3+x*x*x1*x1*x1*x2*y3-x0*x0*x1*x1*x1*x2*y3-x*x*x*x0*x2*x2*y3+x*x0*x0*x0*x2*x2*y3+x*x*x*x1*x2*x2*y3-x0*x0*x0*x1*x2*x2*y3-x*x1*x1*x1*x2*x2*y3+x0*x1*x1*x1*x2*x2*y3+x*x*x0*x2*x2*x2*y3-x*x0*x0*x2*x2*x2*y3-x*x*x1*x2*x2*x2*y3+x0*x0*x1*x2*x2*x2*y3+x*x1*x1*x2*x2*x2*y3-x0*x1*x1*x2*x2*x2*y3)/(x0*x0*x0*x1*x1*x2-x0*x0*x1*x1*x1*x2-x0*x0*x0*x1*x2*x2+x0*x1*x1*x1*x2*x2+x0*x0*x1*x2*x2*x2-x0*x1*x1*x2*x2*x2-x0*x0*x0*x1*x1*x3+x0*x0*x1*x1*x1*x3+x0*x0*x0*x2*x2*x3-x1*x1*x1*x2*x2*x3-x0*x0*x2*x2*x2*x3+x1*x1*x2*x2*x2*x3+x0*x0*x0*x1*x3*x3-x0*x1*x1*x1*x3*x3-x0*x0*x0*x2*x3*x3+x1*x1*x1*x2*x3*x3+x0*x2*x2*x2*x3*x3-x1*x2*x2*x2*x3*x3-x0*x0*x1*x3*x3*x3+x0*x1*x1*x3*x3*x3+x0*x0*x2*x3*x3*x3-x1*x1*x2*x3*x3*x3-x0*x2*x2*x3*x3*x3+x1*x2*x2*x3*x3*x3)
		let x_2 = x * x
		  , x_3 = x_2 * x
		  ,	x0_2 = x0 * x0
		  , x0_3 = x0_2 * x0
		  ,	x1_2 = x1 * x1
		  , x1_3 = x1_2 * x1
		  ,	x2_2 = x2 * x2
		  , x2_3 = x2_2 * x2;
		return (x_3*x1_2*x2*y0-x_2*x1_3*x2*y0-x_3*x1*x2_2*y0+x*x1_3*x2_2*y0+x_2*x1*x2_3*y0-x*x1_2*x2_3*y0-x_3*x1_2*x3*y0+x_2*x1_3*x3*y0+x_3*x2_2*x3*y0-x1_3*x2_2*x3*y0-x_2*x2_3*x3*y0+x1_2*x2_3*x3*y0+x_3*x1*x3*x3*y0-x*x1_3*x3*x3*y0-x_3*x2*x3*x3*y0+x1_3*x2*x3*x3*y0+x*x2_3*x3*x3*y0-x1*x2_3*x3*x3*y0-x_2*x1*x3*x3*x3*y0+x*x1_2*x3*x3*x3*y0+x_2*x2*x3*x3*x3*y0-x1_2*x2*x3*x3*x3*y0-x*x2_2*x3*x3*x3*y0+x1*x2_2*x3*x3*x3*y0-x_3*x0_2*x2*y1+x_2*x0_3*x2*y1+x_3*x0*x2_2*y1-x*x0_3*x2_2*y1-x_2*x0*x2_3*y1+x*x0_2*x2_3*y1+x_3*x0_2*x3*y1-x_2*x0_3*x3*y1-x_3*x2_2*x3*y1+x0_3*x2_2*x3*y1+x_2*x2_3*x3*y1-x0_2*x2_3*x3*y1-x_3*x0*x3*x3*y1+x*x0_3*x3*x3*y1+x_3*x2*x3*x3*y1-x0_3*x2*x3*x3*y1-x*x2_3*x3*x3*y1+x0*x2_3*x3*x3*y1+x_2*x0*x3*x3*x3*y1-x*x0_2*x3*x3*x3*y1-x_2*x2*x3*x3*x3*y1+x0_2*x2*x3*x3*x3*y1+x*x2_2*x3*x3*x3*y1-x0*x2_2*x3*x3*x3*y1+x_3*x0_2*x1*y2-x_2*x0_3*x1*y2-x_3*x0*x1_2*y2+x*x0_3*x1_2*y2+x_2*x0*x1_3*y2-x*x0_2*x1_3*y2-x_3*x0_2*x3*y2+x_2*x0_3*x3*y2+x_3*x1_2*x3*y2-x0_3*x1_2*x3*y2-x_2*x1_3*x3*y2+x0_2*x1_3*x3*y2+x_3*x0*x3*x3*y2-x*x0_3*x3*x3*y2-x_3*x1*x3*x3*y2+x0_3*x1*x3*x3*y2+x*x1_3*x3*x3*y2-x0*x1_3*x3*x3*y2-x_2*x0*x3*x3*x3*y2+x*x0_2*x3*x3*x3*y2+x_2*x1*x3*x3*x3*y2-x0_2*x1*x3*x3*x3*y2-x*x1_2*x3*x3*x3*y2+x0*x1_2*x3*x3*x3*y2-x_3*x0_2*x1*y3+x_2*x0_3*x1*y3+x_3*x0*x1_2*y3-x*x0_3*x1_2*y3-x_2*x0*x1_3*y3+x*x0_2*x1_3*y3+x_3*x0_2*x2*y3-x_2*x0_3*x2*y3-x_3*x1_2*x2*y3+x0_3*x1_2*x2*y3+x_2*x1_3*x2*y3-x0_2*x1_3*x2*y3-x_3*x0*x2_2*y3+x*x0_3*x2_2*y3+x_3*x1*x2_2*y3-x0_3*x1*x2_2*y3-x*x1_3*x2_2*y3+x0*x1_3*x2_2*y3+x_2*x0*x2_3*y3-x*x0_2*x2_3*y3-x_2*x1*x2_3*y3+x0_2*x1*x2_3*y3+x*x1_2*x2_3*y3-x0*x1_2*x2_3*y3)/(x0_3*x1_2*x2-x0_2*x1_3*x2-x0_3*x1*x2_2+x0*x1_3*x2_2+x0_2*x1*x2_3-x0*x1_2*x2_3-x0_3*x1_2*x3+x0_2*x1_3*x3+x0_3*x2_2*x3-x1_3*x2_2*x3-x0_2*x2_3*x3+x1_2*x2_3*x3+x0_3*x1*x3*x3-x0*x1_3*x3*x3-x0_3*x2*x3*x3+x1_3*x2*x3*x3+x0*x2_3*x3*x3-x1*x2_3*x3*x3-x0_2*x1*x3*x3*x3+x0*x1_2*x3*x3*x3+x0_2*x2*x3*x3*x3-x1_2*x2*x3*x3*x3-x0*x2_2*x3*x3*x3+x1*x2_2*x3*x3*x3)
	}
	return {
		degree2: linear,
		degree3: quadratic,
		degree4: cubic,

		linear: linear,
		quadratic: quadratic,
		cubic: cubic,

		any: function(...args) {
			if (args.length === 4)
				return {
					at: (x)=>linear(...args, x)
				}
			else if (args.length === 5)
				return linear(...args);
			else if (args.length === 6)
				return {
					at: (x)=>quadratic(...args, x)
				}
			else if (args.length === 7)
				return quadratic(...args);
			else if (args.length === 8)
				return {
					at: (x)=>cubic(...args, x)
				}
			else if (args.length === 9)
				return cubic(...args);
			else
				throw new Error("This module has no implementation to handle " + args.length + " parameters");
		}
	}
}());

(typeof exports === "object") && (this.exports = FastInterpolation);