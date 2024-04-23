<script lang="ts">
  export let loading: boolean;
  export let value: number;
  export let onInput: () => void;
  
</script>

<div>
  <input disabled={loading} bind:value={value} type="number" on:input={()=>onInput()} />
</div>
