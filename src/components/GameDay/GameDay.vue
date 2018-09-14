<template>
    <div>
        <div class="dateline">{{ dateline }}</div>
        <game-box 
            v-for="game in games"
            :key="game.id"
            :game="game"
            class="game-box"
        >
        </game-box>
    </div>
</template>

<script>
import moment from 'moment';

// components
import GameBox from '../GameBox/GameBox.vue';

export default {
    name: 'gameday',
    props: {
        date: String,
        games: Array,
    },
    computed: {
        dateline() {
            return moment(this.date, 'YYYY-MM-DD').format('ddd, MMMM Do, YYYY');
        }
    },
    components: {
        'game-box': GameBox,
    },
}
</script>

<style lang="scss">
    @import '../../styles/base.scss';

    div.dateline {
        color: $light-grey;
        border-bottom: 0.5px solid rgba($light-grey, 0.1);
    }
</style>