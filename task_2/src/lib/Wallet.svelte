<script lang="ts">
  import { onMount } from "svelte";
  import type { IWallet, ratesKeys } from "../types/wallet";
  import { rates } from "./rates.data";
  import { getWallet } from "./wallet.service";
  import("../types/wallet").then((IWallet) => IWallet);

  let data: {
    data?: IWallet;
    loading: boolean;
  } = {
    data: undefined,
    loading: false,
  };
  let isLoading = false;

  let timer: number;
  onMount(() => {
    loadWallet(rates[0].rate);
  });

  const loadWallet = async (rate: ratesKeys) => {
    data.loading = true;
    isLoading = true;
    const response = await getWallet(rate);
    data = { data: response, loading: false };
    if (timer !== undefined) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      isLoading = false;
    }, 300);
  };

  let selectedOne: { id: number; rate: ratesKeys };
  let selectedTwo: { id: number; rate: ratesKeys };

  let inputValueOne: number;
  let inputValueTwo: number;

  const onInputOne = (rate: ratesKeys) => {
    if (data.data)
      if (isFirstWallet) {
        inputValueTwo = inputValueOne * data.data.rates[rate];
      } else {
        inputValueTwo = inputValueOne / data.data.rates[rate];
      }
  };
  const onInputTwo = (rate: ratesKeys) => {
    if (data.data) {
      if (!isFirstWallet) {
        inputValueOne = inputValueTwo * data.data.rates[rate];
      } else {
        inputValueOne = inputValueTwo / data.data.rates[rate];
      }
    }
  };
  let isFirstWallet = true;
</script>

<div>
  <div>
    <select
      bind:value={selectedOne}
      on:change={async () => {
        await loadWallet(selectedOne.rate);
        isFirstWallet = true;
        onInputOne(selectedTwo.rate);
      }}
    >
      {#each rates as rate}
        <option value={rate}>
          {rate.rate}
        </option>
      {/each}
    </select>
    <input
      disabled={data.loading}
      bind:value={inputValueOne}
      type="number"
      on:input={() => {
        onInputOne(!isFirstWallet ? selectedOne.rate : selectedTwo.rate);
      }}
    />
  </div>
  <select
    bind:value={selectedTwo}
    on:change={async () => {
      await loadWallet(selectedTwo.rate);
      isFirstWallet = false;
      onInputTwo(selectedOne.rate);
    }}
  >
    {#each rates as rate}
      <option value={rate}>
        {rate.rate}
      </option>
    {/each}
  </select>
  <input
    disabled={data.loading}
    bind:value={inputValueTwo}
    type="number"
    on:input={() => {
      onInputTwo(isFirstWallet ? selectedTwo.rate : selectedOne.rate);
    }}
  />
  <div></div>
  {#if isLoading}
    Loading Data...
  {/if}
</div>
