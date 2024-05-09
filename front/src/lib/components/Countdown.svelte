<script lang="ts">
    import { beforeUpdate, afterUpdate, tick } from "svelte";
    export let target_date = new Date("2024-08-30T16:00:00");

    const millisecond = 1;
    const second = 1000*millisecond;
    const minute = 60*second;
    const hour = 60*minute;
    const day = 24*hour;
    
    let current_date = Date.now();

    let time_diff = 0;
    $: time_diff = target_date.getTime() - current_date;

    let day_diff = 0;
    $: day_diff = Math.floor(time_diff / day);
    let hour_diff = 0;
    $: hour_diff = Math.floor((time_diff - day_diff*day) / hour);
    let minute_diff = 0;
    $: minute_diff = Math.floor((time_diff - day_diff*day - hour_diff*hour) / minute);
    let second_diff = 0;
    $: second_diff = Math.floor((time_diff - day_diff*day - hour_diff*hour - minute_diff*minute) / second);

    let updateCurrentDate = () => current_date = Date.now();

    let clear
    $: {
        clearInterval(clear)
        clear = setInterval(updateCurrentDate, second)
    }
</script>


<div class="grid grid-flow-col gap-3 text-center auto-cols-max">
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span class="countdown font-mono text-5xl">
            {day_diff > 99 ? '+' : ''}
        <span style={'--value:'+Math.min(day_diff, 99)+';'}></span>
        </span>
        days
    </div> 
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span class="countdown font-mono text-5xl">
            <span style={'--value:'+hour_diff+';'}></span>
        </span>
        hours
    </div> 
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span class="countdown font-mono text-5xl">
            <span style={'--value:'+minute_diff+';'}></span>
        </span>
        min
    </div> 
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span class="countdown font-mono text-5xl">
            <span style={'--value:'+second_diff+';'}></span>
        </span>
        sec
    </div>
</div>