<template>
    <div>
        <div class="left">
            <div class="home">
                <img src="game.home.helmet" />
            </div> 
            <div class="away">
                <img src="game.away.helmet" />
            </div> 
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
export default {
    name: 'game-box',
    props: {
        game: Object,
    },
}
</script>

<style lang="scss">
    @import '../../styles/base.scss';

    div.game-box {
        width: 98%;
        border-radius: 6px;
        border: 2px solid $grey;
        margin: 0.5em 0;
        background: white;

        div.left {
            width: 70%;
            display: inline-block;
        }

        div.left {
            width: 30%;
            display: inline-block;
        }
    }
</style>