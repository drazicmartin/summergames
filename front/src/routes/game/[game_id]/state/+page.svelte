<script lang="ts">
	import P5 from 'p5-svelte';
    export let data;
    
    $: game_id = data.game.id;
    $: nb_alive_players = data.game.state['#alive_players'];
    $: alive_players_id = Object.keys(data.game.state.loop)
    $: loop = data.game.state.loop;
    let fontSize = 25;
    let text_fact = 1.1;
    let r_fact = 2/5;
    let text_position = [];

	const sketch = (p5) => {
		p5.setup = () => {
			p5.createCanvas(p5.windowWidth, p5.windowHeight-100);
            
            // Set text chasracteristics
            p5.textSize(fontSize);
            p5.textAlign(p5.CENTER, p5.CENTER);

            let r = p5.min(p5.width*r_fact, p5.height*r_fact);
            polygon(p5.width/2, p5.height/2, r)
            draw_names();
			p5.ellipse(p5.width / 2, p5.height / 2, 20, 20);
		};

        function polygon(x, y, radius, npoints = nb_alive_players) {
            let angle = p5.TWO_PI / npoints;
            p5.beginShape();
            for (let a = 0; a < p5.TWO_PI; a += angle) {
                let sx = x + p5.cos(a) * radius;
                let sy = y + p5.sin(a) * radius;
                p5.vertex(sx, sy);
                text_position.push({x: x + p5.cos(a) * radius * text_fact, y: y + p5.sin(a) * radius * text_fact});

                // let sx2 = x + p5.cos(a+angle) * radius;
                // let sy2 = y + p5.sin(a+angle) * radius;

                // let pos = p5.createVector(10, 0);
                // let dir = p5.createVector(sx2-sx, sy2-sy);
                // arrowHead(pos, dir);
            }
            p5.endShape(p5.CLOSE);
        }

        function get_next_player(current_player_id: string){
            let next_player_id = loop[current_player_id].target_id;
            let next_player = loop[next_player_id];
            return {
                current_player_id: next_player_id,
                current_player: next_player
            }
        }

        function draw_names(){
            let n = nb_alive_players;
            
            let first_player_id = alive_players_id[0];
            let current_player_id = first_player_id;
            let current_player = loop[current_player_id];
            let k = 0;
            
            while (n > 0){
                p5.text(current_player.target_name, text_position[k].x, text_position[k].y);
                ({current_player_id, current_player} = get_next_player(current_player_id));
                n-=1;
                k+=1;
            }
        }
	};
</script>

<header class="flex bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6 items-center justify-center">
    <h2 class="font-semibold text-3xl text-slate-900">
        Game State
    </h2>
    <div class="flex justify-end grow">
      <a  
      href="/game/{game_id}"
      class="btn variant-filled mx-10">
          Return
      </a>
    </div>
  </header>
<div class="flex justify-center">
    <P5 sketch={sketch} />
</div>