# olum-icons

OlumIcons is a wrapper for font awesome svg tags, the module structure is designed to include only the imported icons in the production not the whole library.

<p align="center">
 <a href="https://www.npmjs.com/package/olum-icons" target="_blank"><img src="https://img.shields.io/npm/v/olum-icons" alt="npm"></a>
 <img src="https://img.shields.io/npm/dm/olum-icons" alt="npm">
 <img src="https://img.shields.io/npm/l/olum-icons" alt="npm">
</p>

# Documentation
> use this [engine](https://olumjs.github.io/olum-icons/) to search for fonts and get each font module name to be imported in your code as shown below
### ES6 Module

```javascript
import brand_facebook from "olum-icons/dist/fa/brand_facebook";
import brand_twitter from "olum-icons/dist/fa/brand_twitter";

const div = document.querySelector("#my-div");
div.innerHTML = brand_facebook + brand_twitter;
```
