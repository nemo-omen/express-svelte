<script>
	import { Route } from 'tinro';
	import Home from './pages/Home.svelte';
	import About from './pages/About.svelte';

	export let name;
</script>
<main>
<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
</nav>
<Route path="/">
	<Home {name} />
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
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
		@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>