<template>
    <div>
        <div class="left">
            <team
                :helmet="home.helmet"
                :name="home.name"
                :id="home.id"
                :district="home.district"
                :points="home.points"
                class="home"
            />
            <team
                :helmet="away.helmet"
                :name="away.name"
                :id="away.id"
                :district="away.district"
                :points="away.points"
                class="away"
            />
        </div>
        <div class="skew"></div>
        <div class="right">
            <game-details
                :date="date"
                :time="time"
                :location="location"
                class="game-details"
            />
        </div>
    </div>
</template>

<script>
// components
import Team         from '../Team/Team.vue';
import GameDetails  from '../GameDetails/GameDetails.vue';

export default {
    name: 'game-box',
    props: {
        home: {
            type: Object,
            required: true,
        },
        away: {
            type: Object,
            required: true,
        },
        date: {
            type: Object,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
    },
    components: {
        'team': Team,
        'game-details': GameDetails,
    },
}
</script>

<style lang="scss">
    @import '../../styles/base.scss';

    div.game-box {
        width: 98%;
        border-radius: 15px;
        border: 5px solid $grey;
        margin: 0.5em 0;
        background: white;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-evenly;
        align-items: stretch;
        background: white;
        overflow: hidden;

        div.left {
            flex-grow: 3;
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-evenly;
            align-items: flex-start;
            background: white;
            padding-left: 4%;
        }

        div.skew {
            background: $grey;
            width: 115px;
            position: relative;
            left: 40px;
            transform:skew(-15deg, 0deg);
            -ms-transform:skew(-20deg, 0deg);
            -webkit-transform:skew(-15deg, 0deg);
            display: none;

            @include mediaquery(700px) {
                display: block;
            }
        }

        div.right {
            flex-grow: 1;
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-evenly;
            align-items: flex-end;
            background: $grey;
            padding-right: 4%;
            padding-left: 1%;

            @include mediaquery($default-mobile) {
                padding-left: 0;
            }
        }
    }
</style>
