<template>
    <div id="scoreboard">
        <h1>Regional high school football schedule</h1>
        <search-box @filter-teams="setTeamFilter"/>
        <div v-if="store.state.isFetching" class="is-fetching">
            <img src="//s.hdnux.com/photos/75/60/52/16190107/4/rawImage.gif" />
        </div>
        <game-day
            v-for="(day, idx) in filteredTeams"
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
import GameDay      from '../GameDay/GameDay.vue';
import SearchBox    from '../SearchBox/SearchBox.vue';

export default {
    name: 'scoreboard',
    data() {
        return {
            store: new Store(),
            teamFilter: '',
        };
    },
    computed: {
        filteredTeams () {
            if (this.teamFilter.length < 3) return this.store.state.schedule;
            return this.store.state.schedule.map(day => ({
                games: day.games.filter(game => this.isTeamInGame(game)),
                date: day.date,
            }));
        },
    },
    methods: {
        isTeamInGame (game) {
            return this.teamFilter.split(' ').every(term => {
                return game.home.name.toLowerCase().includes(term.toLowerCase()) || game.away.name.toLowerCase().includes(term.toLowerCase());
            });
        },
        setTeamFilter (val) {
            this.teamFilter = val;
        }
    },
    mounted () {
        this.store.dispatch('getCurrentSeason');
    },
    components: {
        'game-day': GameDay,
        'search-box': SearchBox,
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

            @include mediaquery(700px) {
                font-size: 2em;
            }
        }

        div.is-fetching {
            width: 100%;
            text-align: center;

            img {
                max-width: 441px;
                height: auto;
                width: 100%;
            }
        }
    }
</style>