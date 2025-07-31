<script lang="ts">
    import { onMount } from "svelte";

    interface Props {
        target_date?: any;
    }

    let { target_date = new Date("2026-08-28T16:00:00") }: Props = $props();

    const millisecond = 1;
    const second = 1000*millisecond;
    const minute = 60*second;
    const hour = 60*minute;
    const day = 24*hour;
    
    let current_date = $state(Date.now());

    let time_diff = $derived(target_date.getTime() - current_date);
    
    let day_diff = $derived(Math.floor(time_diff / day));
    let hour_diff = $derived(Math.floor((time_diff - day_diff*day) / hour));
    let minute_diff = $derived(Math.floor((time_diff - day_diff*day - hour_diff*hour) / minute));
    let second_diff = $derived(Math.floor((time_diff - day_diff*day - hour_diff*hour - minute_diff*minute) / second));

    function updateCurrentDate(){
        current_date = Date.now();
    }

    onMount(() => {
        setInterval(updateCurrentDate, second);
    });
</script>


<div class="grid grid-flow-col gap-3 text-center auto-cols-max">
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span class="countdown font-mono text-5xl">
            {day_diff}
        </span>
        days
    </div> 
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span class="countdown font-mono text-5xl">
            {hour_diff}
        </span>
        hours
    </div> 
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span class="countdown font-mono text-5xl">
            {minute_diff}
        </span>
        min
    </div> 
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span class="countdown font-mono text-5xl">
            {second_diff}
        </span>
        sec
    </div>
</div>