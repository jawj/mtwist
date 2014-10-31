
class @MTwist

  # Mersenne Twister drop-in replacement for Math.random, 
  # including the 2002 improvements to initialization

  constructor: (seed = Math.random() * 4294967295) ->  # seed with a 32-bit integer
    uint32mul = (n1, n2) ->
      n1Low16 = n1 & 0x0000ffff
      n1High16 = n1 >>> 16
      n2Low16 = n2 & 0x0000ffff
      n2High16 = n2 >>> 16
      ((((n1 & 0xffff0000) * n2) >>> 0) + (((n1 & 0x0000ffff) * n2) >>> 0)) >>> 0
    @mt = new Array 624
    @mt[0] = seed >>> 0
    for mti in [1...624]
      @mt[mti] = (uint32mul(1812433253, (@mt[mti - 1] ^ (@mt[mti - 1] >>> 30))) + mti) >>> 0
    @mti = mti

  randomUint32: =>
    if @mti >= 624
      for i in [0...227]
        y = ((@mt[i] & 0x80000000) | (@mt[i + 1] & 0x7fffffff)) >>> 0
        @mt[i] = (@mt[i + 397] ^ (y >>> 1) ^ (if y & 1 then 0x9908b0df else 0)) >>> 0
      for i in [227...623]
        y = ((@mt[i] & 0x80000000) | (@mt[i + 1] & 0x7fffffff)) >>> 0
        @mt[i] = (@mt[i - 227] ^ (y >>> 1) ^ (if y & 1 then 0x9908b0df else 0)) >>> 0
      y = ((@mt[623] & 0x80000000) | (@mt[0] & 0x7fffffff)) >>> 0
      @mt[623] = (@mt[396] ^ (y >>> 1) ^ (if y & 1 then 0x9908b0df else 0)) >>> 0
      @mti = 0
    y = @mt[@mti++]
    y = (y ^ (y >>> 11)) >>> 0
    y = (y ^ ((y << 7) & 0x9d2c5680)) >>> 0
    y = (y ^ ((y << 15) & 0xefc60000)) >>> 0
    y = (y ^ (y >>> 18)) >>> 0
    y

  random: =>  # [0,1), like Math.random
    @randomUint32() / 4294967296  # 2^32

  randomIntBelow: (maxPlusOne) =>  # with proper uniform distribution, per WARNING at http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/efaq.html
    throw "Upper bound must be greater than or equal to 1" if maxPlusOne < 1
    return 0 if maxPlusOne is 1
    bitsNeeded = (maxPlusOne - 1).toString(2).length
    bitMask = (1 << bitsNeeded) - 1
    while yes
      int = @randomUint32() & bitMask
      return int if int < maxPlusOne

  randomIntBetween: (inclusiveMin, inclusiveMax) ->
    inclusiveMin + @randomIntBelow(inclusiveMax - inclusiveMin + 1)

  @test = ->  # returns true if answer is as calculated using official C implementation
    seed = 1234567890
    iterationFactor = 10000  # makes max iterations about 400,000
    for i in [0...1000]
      mtwist = new MTwist seed
      iterations = Math.floor(mtwist.randomUint32() / iterationFactor)
      mtwist.randomUint32() for j in [0...iterations]
      seed = mtwist.randomUint32()
    seed is 1240212512

