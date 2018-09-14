<template>
    <div id="scoreboard">
        <h1>Schedule</h1>
        <game-day
            v-for="(day, idx) in state.schedule"
            :key="idx"
            :date="day.date"
            :games="day.games"
            class="game-day"
        >
        </game-day>
    </div>
</template>

<script>
// data store
import Store from '../../store';

// components
import GameDay from '../GameDay/GameDay.vue';

export default {
    name: 'scoreboard',
    data() {
        return new Store();
    },
    mounted: function () {
        this.dispatch('getCurrentSeason');
    },
    components: {
        'game-day': GameDay,
    }
}
</script>

<style lang="scss">
    @import '../../styles/base.scss';

    div#scoreboard {
        font-family: 'Oswald', sans-serif;
        font-size: 12px;
        width: 98%;
        max-width: 1000px;
        margin: 0 auto;

        @include mediaquery(500px) {
            font-size: 16px;
        }

        h1 {
            font-size: 1.5em;
            margin-bottom: 1em;
        }
    }
</style>