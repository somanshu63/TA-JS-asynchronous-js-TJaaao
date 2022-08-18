1.  import image from "../img/1.jpeg"

2.  import image from "../img/2.jpeg"

3.  import image from "../img/3.jpeg"

4.  import image from "../img/4.jpeg"

5.  0s first
    3s third
    3.1s second

6.  console.log('one');
    console.log('two');
    setTimeout(() => console.log('Third'), 0);

7.  console.log('one');
    console.log('two');
    setTimeout(() => console.log('Third'), 0);

8.  function asyncForEach(){
    }
  console.log('one');
  setTimeout(asyncForEach([1, 2, 3], (num) => console.log(num)), 1000);
  console.log('three');

9.  console.log('First Call');
    setTimeout(()=>{
        [1, 2, 3, 4, 5].forEach((num) => console.log(num))
    }, 1000);
    console.log('Last Call');
