# The [Degree of Difficulty](https://en.wikipedia.org/wiki/Cryptographic_hash_function#Degree_of_difficulty) for `Mio.sign`
### Equation

![Complexity of Mio.sign](img/a.png "Complexity of Mio.sign")

### Explanation

- *16*
  - __The `fidelity` argument ranges from (0, 1) at 16 distinct points__
    - So really, *fidelity = [0, 16]* in that sense

- ![Sum of n=16, to n=36](img/b.png "Sum of n=16, to n=36")
  - __Get the sum of *n=16* up to *n=36* for *n<sup>256!</sup>*__
  - `Mio.sign` returns its output using the numerical bases from Base<sub>16</sub> (0-9, a-f) to Base<sub>36</sub> (0-9, a-z)

- *n<sup>256!</sup>*
  - __Get the [permutations](https://en.wikipedia.org/wiki/Permutation) of *n<sup>256!</sup>*__
    - Use *256!* since the signature can be any length of *(0, 256]* (see [intervals])
    - _The signature's length will only be **0** for an empty string_
  - `Mio.sign` will return a string with a length between *(0, 256]* (see [intervals])

- \+ 1
  - __Include the empty string__


### Other hashing algorithms and their degrees of difficulty

- [MD5](https://en.wikipedia.org/wiki/MD5)
  - 32 characters using Base<sub>16</sub>
  - 16<sup>32</sup>

- [SHA-1](https://en.wikipedia.org/wiki/SHA-1)
  - 40 characters using Base<sub>16</sub>
  - 16<sup>40</sup>

- [SHA-2](https://en.wikipedia.org/wiki/SHA-2)
  - 56 characters using Base<sub>16</sub>
  - 16<sup>56</sup>

[intervals]: https://en.wikipedia.org/wiki/Interval_(mathematics)
