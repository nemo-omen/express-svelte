<script>
import { onMount } from 'svelte';
  export let name;

  function normalizeUrl(url) {
    const location = window.location.toString();
    let passedUrl = url;
    let constructedUrl = location.slice(0, -1) + url;
    return constructedUrl;
  }

  async function getGraphics() {
    const response = await fetch('http://localhost:3030/api/graphics');
    const data = await response.json();
    console.log(data);
  }

onMount(() => {
  getGraphics();
});
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>