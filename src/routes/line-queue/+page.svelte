<script lang="ts">
	import Fullscreen from '$lib/components/Fullscreen.svelte';
	import ExternalLink from '$lib/components/typo/ExternalLink.svelte';
	import {
		Button,
		Checkbox,
		Column,
		FormLabel,
		Grid,
		Row,
		TextInput
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	let page1Element;
	let page2Element;
	interface QueueItem {
		id: number;
		number: number;
		counter: number;
	}
	let queue: QueueItem[] = [];
	let currentCounter = 1;
	let currentQueueNumber = 1;
	let isCustomqueueNumber = false;
	function readQueue() {
		const queueString = window.localStorage.getItem('queue');
		if (queueString) {
			queue = JSON.parse(queueString);
			if (isCustomqueueNumber) {
				currentQueueNumber = currentQueueNumber;
			} else {
				currentQueueNumber = queue.length + 1;
			}
		} else {
			queue = [];
			currentQueueNumber = 0;
		}
	}

	function addQueue(...items: QueueItem[]) {
		window.localStorage.setItem('queue', JSON.stringify([...queue, ...items]));
		readQueue();
	}

	onMount(() => {
		readQueue();
		window.addEventListener('storage', () => {
			readQueue();
		});
	});
</script>

<div class="prose">
	<p>
		This lab is pretty much another play from me. I have discovered that we can share state between
		tab using
		<ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">
			<code>window.localStorage</code>
		</ExternalLink> from those who create a cool window relative postion with its content.
	</p>
</div>

<section
	bind:this={page1Element}
	class="bg-white p-10 border-2 border-solid border-gray-800 rounded"
>
	<Grid>
		<Row>
			<Column>โรงเรียนวิทยาศาสตร์แห่งหนึ่งลุ่มแม่น้ำมูล</Column>
		</Row>
		<Row>
			<Column>
				<span class="text-xl"> ขอเชิญหมายเลข </span>
			</Column>
		</Row>
		{#each queue.slice(-3).toReversed() as item, i}
			<Row>
				<Column>
					<span class={i == 0 ? 'text-[17dvw] font-bold' : 'text-[10dvw]'}>{item.number}</span>
				</Column>
				<Column>
					<div
						class="flex flex-col text-center {i == 0
							? 'border-2 border-yellow-500 bg-yellow-100 border-solid'
							: 'border-2 border-gray-800/10 border-solid'}"
					>
						{#if i == 0}
							<span class="text-3xl"> ช่องบริการ </span>
						{/if}
						<span class={i == 0 ? 'text-[12dvw]' : 'text-[10dvw]'}> {item.counter}</span>
					</div>
				</Column>
			</Row>
		{/each}
	</Grid>
	<Fullscreen ref={page1Element} size="small" class="m-auto" />
</section>

<section
	bind:this={page2Element}
	class="bg-white p-10 border-2 border-solid border-gray-800 rounded"
>
	<Grid>
		<Row class="opacity-50">
			<Column>หากคุณกด:</Column>
		</Row>
		<Row class="opacity-50">
			<Column>
				<span class="text-xl"> เชิญหมายเลข </span>
			</Column>
		</Row>
		<Row class="opacity-50">
			<Column>
				<span class="text-[7dvw]">{currentQueueNumber}</span>
			</Column>
			<Column>
				<div
					class="flex flex-col text-center bg-yellow-300/30 border-2 border-gray-800/10 border-solid"
				>
					<span class="text-[7dvw]"> {currentCounter}</span>
				</div>
			</Column>
		</Row>
		<hr class="my-3" />
		{#each queue.slice(-3).toReversed() as item, i}
			<Row>
				<Column>
					<span class="text-[7dvw]">{item.number}</span>
				</Column>
				<Column>
					<div
						class="flex flex-col text-center border-2 border-gray-800/10 border-solid {item.counter ===
						currentCounter
							? 'font-bold bg-yellow-300/50'
							: ''}"
					>
						<span class="text-[7dvw]"> {item.counter}</span>
					</div>
				</Column>
			</Row>
		{/each}
	</Grid>
	<TextInput labelText="Counter" type="number" bind:value={currentCounter} />
	<FormLabel>Queue Number</FormLabel>
	<Checkbox bind:checked={isCustomqueueNumber} labelText="Custom Number" />
	{#if isCustomqueueNumber}
		<TextInput label="Queue Number" type="number" bind:value={currentQueueNumber} />
	{/if}
	<Button
		size="lg"
		on:click={() => {
			addQueue({
				id: Math.random(),
				number: currentQueueNumber++,
				counter: currentCounter ? +currentCounter : 1
			});
		}}>Next in queue</Button
	>
	<Button
		kind="ghost"
		size="lg"
		on:click={() => {
			addQueue({
				id: Math.random(),
				number: currentQueueNumber,
				counter: currentCounter ? +currentCounter : 1
			});
		}}>Recall</Button
	>
	<Button
		size="small"
		kind="danger-ghost"
		on:click={() => {
			window.localStorage.removeItem('queue');
			queue = [];
			currentQueueNumber = 0;
		}}>Clear</Button
	>
	<Fullscreen ref={page2Element} size="lg" class="m-auto" />
</section>
