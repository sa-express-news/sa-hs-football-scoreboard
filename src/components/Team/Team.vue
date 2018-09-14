<template>
    <div>
        <img class="helmet" :src="helmet" />
        <div class="details">
            <div class="name">{{ name }}</div>
            <div class="district">{{ district }}</div>
        </div>
        <div class="points">{{ points }}</div>
    </div> 
</template>

<script>
export default {
    name: 'team',
    props: {
        id: {
            type: Number,
            required: true,
        },
        points: {
            type: Number | null,
            required: true,
        },
        helmet: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        district: {
            type: String | null,
            required: true,
        },
    },
}
</script>

<style lang="scss">
    @import '../../styles/base.scss';

    div.home, div.away {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        
        img.helmet {
            max-width: 70px;
            width: 100%;
            height: auto;
            padding: 0.8em 0.5em;

            @include mediaquery($default-mobile) {
                max-width: 100px;
            }

            @include mediaquery(700px) {
                max-width: 122px;
            }
        }

        div.details {
            color: $en-black;
            text-align: left;
            padding: 0.8em 1em;

            @include mediaquery($default-mobile) {
                padding: 0.8em 2em;
            }
            
            div.name {
                font-size: 1.2em;

                @include mediaquery(700px) {
                    font-size: 1.6em;
                }

                @include mediaquery(900px) {
                    font-size: 1.8em;
                }
            }

            div.district {
                font-size: 1em;
                color: $en-red;
            }
        }

        div.points {
            float: right;
            font-size: 2em;
            padding: 0.3em 1em 0.1em 0;
            color: darken($en-red, 15%);
            margin-left: auto;

            @include mediaquery(600px) {
                padding: 0.3em 0.5em 0.1em 0;
            }

            @include mediaquery(700px) {
                padding: 0.1em 0.1em 0.1em 0;
                font-size: 3em;
            }
        }
    }
</style>
