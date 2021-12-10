/** 
 * Copyright 2014 - 2021 George MacKerron
 * Released under the MIT Licence: http://opensource.org/licenses/MIT
 */

/** 
 * Mersenne Twister drop-in replacement for Math.random,
 * including the 2002 improvements to initialization.
 */
export default class MTwist {
  private mt: number[];
  private mti: number;

  /**
   * Pass a seed value for reproducible sequences, which are the main reason to
   * use this library over plain Math.random()
   * @param seed An integer between 0 and 4294967295
   */
  constructor(seed = Math.random() * 4294967295) { // seed with a 32-bit integer
    this.mt = new Array(624);
    this.mt[0] = seed >>> 0;
    const n1 = 1812433253;
    for (let mti = 1; mti < 624; mti++) {
      const n2 = this.mt[mti - 1] ^ (this.mt[mti - 1] >>> 30);
      this.mt[mti] = ((((n1 & 0xffff0000) * n2) >>> 0) + (((n1 & 0x0000ffff) * n2) >>> 0) + mti) >>> 0;
    }
    this.mti = 624;
  }

  /**
   * Returns an integer in the interval [0,0xffffffff]
   */
  randomUInt32() { // [0,0xffffffff]
    let y;
    if (this.mti >= 624) {
      for (let i = 0; i < 227; i++) {
        y = ((this.mt[i] & 0x80000000) | (this.mt[i + 1] & 0x7fffffff)) >>> 0;
        this.mt[i] = (this.mt[i + 397] ^ (y >>> 1) ^ (y & 1 ? 0x9908b0df : 0)) >>> 0;
      }
      for (let i = 227; i < 623; i++) {
        y = ((this.mt[i] & 0x80000000) | (this.mt[i + 1] & 0x7fffffff)) >>> 0;
        this.mt[i] = (this.mt[i - 227] ^ (y >>> 1) ^ (y & 1 ? 0x9908b0df : 0)) >>> 0;
      }
      y = ((this.mt[623] & 0x80000000) | (this.mt[0] & 0x7fffffff)) >>> 0;
      this.mt[623] = (this.mt[396] ^ (y >>> 1) ^ (y & 1 ? 0x9908b0df : 0)) >>> 0;
      this.mti = 0;
    }
    y = this.mt[this.mti++];
    y = (y ^ (y >>> 11)) >>> 0;
    y = (y ^ ((y << 7) & 0x9d2c5680)) >>> 0;
    y = (y ^ ((y << 15) & 0xefc60000)) >>> 0;
    y = (y ^ (y >>> 18)) >>> 0;
    return y;
  }

  /**
   * Returns a fractional number in the interval [0,1), just like Math.random
   */
  random() { // [0,1), like Math.random
    return this.randomUInt32() / 4294967296; // 2^32
  }

  /**
   * Returns an integer in the interval [0,n) with proper uniform distribution
   * [see WARNING](http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/efaq.html)
   * @param maxPlusOne The integer returned will be less than this value
   */
  randomIntBelow(maxPlusOne: number) {
    if (maxPlusOne < 1) throw new Error("Upper bound must be greater than or equal to 1");
    if (maxPlusOne > 4294967296) throw new Error("Upper bound must not be greater than 4294967296");
    if (maxPlusOne === 1) return 0;
    const
      bitsNeeded = Math.ceil(Math.log2(maxPlusOne)),
      bitMask = (1 << bitsNeeded) - 1;
    while (true) {
      const int = this.randomUInt32() & bitMask;
      if (int < maxPlusOne) return int;
    }
  }

  /**
   * Returns an integer in the interval [m,n] with proper uniform distribution
   * [see WARNING](http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/efaq.html)
   * @param inclusiveMin The integer returned will be no lower than this value
   * @param inclusiveMax The integer returned will be no higher than this value
   */
  randomIntBetween(inclusiveMin: number, inclusiveMax: number) { // [m,n]
    return inclusiveMin + this.randomIntBelow(inclusiveMax - inclusiveMin + 1);
  }

  /**
   * Returns true if test calculations match those from the official C code
   */
  static test() {
    const iterationFactor = 10000;  // makes max iterations about 400,000
    let seed = 3234567890;

    for (let i = 0; i < 1000; i++) {
      const
        mtwist = new MTwist(seed),
        iterations = Math.floor(mtwist.randomUInt32() / iterationFactor);

      for (let j = 0; j < iterations; j++) mtwist.randomUInt32();
      seed = mtwist.randomUInt32();
    }

    return seed === 1061063157;
  }

}

