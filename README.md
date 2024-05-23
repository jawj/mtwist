# mtwist

This is a concise implementation of the [Mersenne Twister](https://en.wikipedia.org/wiki/Mersenne_Twister) Pseudo-Random Number Generator (PRNG) for JavaScript.

The library:

* Includes [initialization improvements to the algorithm that were made in 2022](http://www.math.sci.hiroshima-u.ac.jp/m-mat/MT/MT2002/CODES/readme-mt.txt)
* Is tested against the original C implementation
* Includes TypeScript types

The Mersenne Twister is not a cutting-edge PRNG. It is not cryptographically secure. But it is very widely used, being the [default PRNG for Excel, R, Python, Ruby and others](https://en.wikipedia.org/wiki/Mersenne_Twister#Applications).

## Why would I use this?

* The key use case is for reproducible pseudo-random sequences, which you get by manually seeding your PRNG
* You could also use this because you want your random numbers generated the same way across all browsers and JavaScript engines

## How do I use this?

    x = Math.random();
    
becomes

    import MersenneTwister from 'mtwist';
   
    seed = 1234567890;  // an integer between 0 and 4294967295
    m = new MersenneTwister(seed);
    x = m.random();
    
Methods to produce evenly distributed integers in the ranges [0,n) and [m,n] are also provided.

For details, see [index.ts](https://github.com/jawj/mtwist/blob/master/index.ts).

## Licence

&copy; Copyright 2014 – 2021 George MacKerron and released under the [MIT Licence](http://opensource.org/licenses/MIT).
