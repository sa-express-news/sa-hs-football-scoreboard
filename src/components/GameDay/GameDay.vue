<template>
    <div>
        <div class="dateline">{{ dateline }}</div>
        <game-box 
            v-for="game in games.slice(0, 5)"
            :key="game.id"
            :gameID="game.id"
            :home="game.home"
            :away="game.away"
            :time="game.time"
            :date="getDateObj(game.date)"
            :location="game.location"
            class="game-box"
        />
        <game-day-accordion
            :games="games.slice(5)"
            :date="date"
            class="game-day-accordion"
        />
    </div>
</template>

<script>
import moment from 'moment';

// components
import GameBox          from '../GameBox/GameBox.vue';
import GameDayAccordion from '../GameDayAccordion/GameDayAccordion.vue';

export default {
    name: 'gameday',
    props: {
        date: {
            type: String,
            required: true,
        },
        games: {
            type: Array,
            required: true,
        },
    },
    computed: {
        dateline() {
            return moment(this.date, 'YYYY-MM-DD').format('ddd, MMMM Do, YYYY');
        }
    },
    methods: {
        getDateObj(dateStr) {
            return moment(dateStr, 'YYYY-MM-DD');
        },
    },
    components: {
        'game-box': GameBox,
        'game-day-accordion': GameDayAccordion,
    },
}
</script>

<style lang="scss">
    @import '../../styles/base.scss';

    div.dateline {
        color: $light-grey;
        font-size: 1.1em;
        border-bottom: 0.5px solid rgba($light-grey, 0.1);
    }
</style>
