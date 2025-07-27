<script lang="ts">
    import { run } from 'svelte/legacy';

    import { tick } from "svelte";
    interface Props {
        target_date?: any;
    }

    let { target_date = new Date("2024-08-30T16:00:00") }: Props = $props();

    const millisecond = 1;
    const second = 1000*millisecond;
    const minute = 60*second;
    const hour = 60*minute;
    const day = 24*hour;
    
    let current_date = $state(Date.now());

    let time_diff = $state(0);
    run(() => {
        time_diff = target_date.getTime() - current_date;
    });

    let day_diff = $state(0);
    run(() => {
        day_diff = Math.floor(time_diff / day);
    });
    let hour_diff = $state(0);
    run(() => {
        hour_diff = Math.floor((time_diff - day_diff*day) / hour);
    });
    let minute_diff = $state(0);
    run(() => {
        minute_diff = Math.floor((time_diff - day_diff*day - hour_diff*hour) / minute);
    });
    let second_diff = $state(0);
    run(() => {
        second_diff = Math.floor((time_diff - day_diff*day - hour_diff*hour - minute_diff*minute) / second);
    });

    let updateCurrentDate = () => current_date = Date.now();

    let clear = $state()
    run(() => {
        clearInterval(clear)
        clear = setInterval(updateCurrentDate, second)
    });
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