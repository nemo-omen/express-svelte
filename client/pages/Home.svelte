<script>
  export let name;
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<p>Visit the <a href="https://expressjs.com/en/starter/installing.html">Express guide</a> to learn how to build Express apis.</p>
  <p><br>You can modify the Svelte app in the <code>client</code> directory.</p>
  <p>The api routes are located in the <code>routes</code> directory. And the (very basic) CRUD service is located in the <code>services</code> directory.</p>
  <p>Finally, you can change a few environment variables by copying <code>.env.example</code> to <code>.env</code> and change things there.</p>
</main>

<style>
  main {
    width: 50%;
    margin: 0 auto;
  }
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>