# MTwist

* A concise Mersenne Twister implementation in CoffeeScript/JavaScript
* Includes the 2002 initialization improvements
* Tested against the original C implementation

## Why would I use this?

* You want to be able to seed your random number generator to create reproducible sequences
* You want to know exactly how your random numbers are generated across all JS engines

## How do I use this?

    x = Math.random();
    
becomes
   
    seed = 1234567890;  // an integer between 0 and 4294967295
    m = new MTwist(seed);
    x = m.random();
    
Methods to produce evenly distributed integers in the ranges [0,n) and [m,n] are also provided.

For details, see [index.coffee](https://github.com/jawj/mtwist/blob/master/index.coffee).

## Licence

&copy; Copyright 2014 – 2021 George MacKerron and released under the [MIT Licence](http://opensource.org/licenses/MIT).
