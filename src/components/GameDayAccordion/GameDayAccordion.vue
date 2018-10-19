<template>
    <div>
        <transition
            name="accordion"
            @before-enter="beforeEnter"
            @enter="enter"
            @before-leave="beforeLeave"
            @leave="leave"
        >
            <div class="games-wrapper" v-show="show">
                <game-box 
                    v-for="game in games"
                    :key="game.id"
                    :gameID="game.id"
                    :home="game.home"
                    :away="game.away"
                    :time="game.time"
                    :date="getDateObj(game.date)"
                    :location="game.location"
                    class="game-box"
                />
            </div>
        </transition>
        <div class="header" @click="toggle">Show {{ clickAction }} {{ weekday }} games <i class="fa fa-angle-down" :class="{ rotate: show }"></i></div>
    </div>
</template>

<script>
import moment from 'moment';

// components
import GameBox from '../GameBox/GameBox.vue';

export default {
    name: 'gamedayaccordion',
    data() {
        return {
            show: false,
        };
    },
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
        weekday() {
            return this.getDateObj(this.date).format('dddd');
        },
        clickAction() {
            return this.show ? 'less' : 'all';
        }
    },
    methods: {
        toggle() {
            this.show = !this.show;
        },
        getDateObj(dateStr) {
            return moment(dateStr, 'YYYY-MM-DD');
        },
        beforeEnter: function(el) {
            el.style.height = '0';
        },
        enter: function(el) {
            el.style.height = el.scrollHeight + 'px';
        },
        beforeLeave: function(el) {
            el.style.height = el.scrollHeight + 'px';
        },
        leave: function(el) {
            el.style.height = '0';
            // this.$el.querySelector('div.header').scrollIntoView(); // This seems to be conflicting with something on MySA
        }
    },
    components: {
        'game-box': GameBox,
    },
}
</script>

<style lang="scss">
    @import '../../styles/base.scss';

    div.game-day-accordion {
        width: 100%;
        margin-bottom: 50px;

        div.header {
            text-align: center;
            font-size: 1.1em;
            color: $light-grey;
            text-decoration: underline;
            cursor: pointer;

            i {
                color: $en-black;
                transform: rotate(0deg);
                transition-duration: 0.3s;

                &.rotate {
                    transform: rotate(180deg);
                    transition-duration: 0.3s;
                }
            }
        }

        div.games-wrapper {
            transition: 300ms ease-out;
        }
    }
</style>
