<script>
	import { Route } from 'tinro';
	import Home from './pages/Home.svelte';
	import About from './pages/About.svelte';

</script>
<main>
<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
</nav>
<Route path="/">
	<Home />
</Route>
<Route path="/about">
	<About />
</Route>
</main>

<style>
nav a {
	margin: 0 0.5em;
}
main {
    width: 50%;
    margin: 0 auto;
	text-align: center;
  }
</style>