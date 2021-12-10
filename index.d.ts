/**
 * Copyright 2014 - 2021 George MacKerron
 * Released under the MIT Licence: http://opensource.org/licenses/MIT
 */
/**
 * Mersenne Twister drop-in replacement for Math.random,
 * including the 2002 improvements to initialization.
 */
export default class MTwist {
    private mt;
    private mti;
    /**
     * Pass a seed value for reproducible sequences, which are the main reason to
     * use this library over plain Math.random()
     * @param seed An integer between 0 and 4294967295
     */
    constructor(seed?: number);
    /**
     * Returns an integer in the interval [0,0xffffffff]
     */
    randomUInt32(): number;
    /**
     * Returns a fractional number in the interval [0,1), just like Math.random
     */
    random(): number;
    /**
     * Returns an integer in the interval [0,n) with proper uniform distribution
     * [see WARNING](http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/efaq.html)
     * @param maxPlusOne The integer returned will be less than this value
     */
    randomIntBelow(maxPlusOne: number): number;
    /**
     * Returns an integer in the interval [m,n] with proper uniform distribution
     * [see WARNING](http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/efaq.html)
     * @param inclusiveMin The integer returned will be no lower than this value
     * @param inclusiveMax The integer returned will be no higher than this value
     */
    randomIntBetween(inclusiveMin: number, inclusiveMax: number): number;
    /**
     * Returns true if test calculations match those from the official C code
     */
    static test(): boolean;
}
