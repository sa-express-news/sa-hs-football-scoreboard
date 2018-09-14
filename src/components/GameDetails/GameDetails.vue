<template>
    <div>
        <div class="datetime">
            <div class="month">{{ month }}</div>
            <div class="time">{{ time }}</div>
            <div class="weekday">{{ weekday }}</div>
        </div>
        <hr />
        <div class="location"><i class="fas fa-map-marker-alt"></i> {{ location }}</div>
    </div>
</template>

<script>
export default {
    name: 'game-details',
    props: {
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
    computed: {
        month() {
            return this.date.format('DD MMM');
        },
        weekday() {
            return this.date.format('dddd');
        },
    },
}
</script>

<style lang="scss">
    @import '../../styles/base.scss';

    div.game-details {
        text-transform: uppercase;
        color: white;
        text-align: right;
        z-index: 100;

        div.datetime {
            font-size: 1em;

            @include mediaquery(500px) {
                font-size: 1.2em;
            }
        }

        hr {
            border: 0;
            height: 1px;
            width: 30%;
            margin: 12px 0;
            background: rgba($en-red,.3);
            background-image: linear-gradient(to right, rgba($en-red,.1), rgba(white,.3), rgba($en-red,.1));
            display: inline-block;
        }

        div.location i {
            font-size: 0.95em;
            color: $en-red;
        }
    }
</style>
