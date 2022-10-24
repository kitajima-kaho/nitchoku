<template>
	<main>
        <div class="main_wrap">
            <slot></slot>
        </div>
    </main>
</template>
<style lang="scss">
main {
    width: 100%;
    background-color: #FCF4EC;

    .main_wrap {
        margin-right: auto;
        margin-left: auto;
        max-width: 925px;
        display: flex;


        .media {
            margin-top: 20px;
            width: 620px;
            display: block;

        .main_title {
            text-align: center;
            margin-bottom: 15px;
        }
        
        .click_container {
            display: flex;
            justify-content: space-between;  
            margin-bottom: 20px;


            .btn_container {
                display: flex;
            }
        }

		.second_click_none {
			pointer-events: none;
		}

            .roulette_cover {
                background-color: #FF8A02;
                width: 450px;
                height: 450px;
                border-radius: 50%;
                margin: auto;
                position: relative;
                

                .target {
                    display: flex;
                    align-items: center;
                    width: 225px;
                    height: 225px;
                    text-align: center;

                    &:first-child {
                        position: absolute;
                        top: 0px;
                        right: 0px;
                        border-radius: 0 100% 0 0;
                        padding-left: 10px;
                        border: solid 0.5em blue;
                        background-color: #bbdbf3;

                        &:not(.color_blue) {
                            border: none;
                            background-color: #bbdbf3;
                        }
                    }

                    &:nth-child(2) {
                        position: absolute;
                        bottom: 0px;
                        right: 0px;
                        border-radius: 0 0 100% 0;
                        padding-left: 15px;
                        border: solid 0.5em red;
                        background-color: #e3acae;

                        &:not(.color_red) {
                            border: none;
                            background-color: #e3acae;
                        }
                    }

                    &:nth-child(3) {
                        position: absolute;
                        bottom: 0px;
                        left: 0px;
                        border-radius: 0 0 0 100%;
                        border: solid 0.5em green;
                        background-color: #a3d6ce;

                        &:not(.color_green) {
                            border: none;
                            background-color: #a3d6ce;
                        }
                    }

                    &:last-child {
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        border-radius: 100% 0 0 0;
                        border: solid 0.5em yellow;
                        background-color: #ffedab;

                        &:not(.color_yellow) {
                            border: none;
                            background-color: #ffedab;
                            
                        }
                    }

                }
            }

            .button {
                display: block;
            }

        }  

        .box {
            padding: 20px;
        }

    }
}

</style>