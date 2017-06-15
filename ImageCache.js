const imageLoaderCache = [{
	"fileName": "stone.png",
	"reply": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABCElEQVQ4T4VTsRGEMAyLayjoKBiA1RiAnhGYjwEo6Cigzp98r5zwh/tUiS6RJdmxZVnyfd9JV9M0qes6h7ZtS+M4pvM8U+2egQAX+YBE+74XzmEYyh6Efd/7GYROcBxHatvWweu6yh5nPAYZVHGhGBRhOYECAEGIKopH+bgH0kIAQGU/QvkqiRjs2DzPnoFK1GrAqYi+aRUqbV1XJ4AnM0s5Zw+HwdGr+ufeFbALyh6lxmBV8SMD9ryWeiTl2QlqCbNKzT/b67Z1kNgF+seZ8nWYNBebpilzsphDHBqGHIMsIb5ZoNS3GfkZJA0qfh5aoTr+nb9tjA+U2BVwElkdlfB9o+84JyT+AHgnw0FDUcTDAAAAAElFTkSuQmCC"
}, {
	"fileName": "grass_green.png",
	"reply": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC10lEQVQ4TyWTS2sUQRzEq+e9M/vejdFESaIxCaKgQhRFMSDoRTz4BUTBi4+LN/HmwZMfzWswiDGJGE022ffs7rzb6nbZZZid6er6/6paPPpwTU77MSzXRDpNIQsgTwssbbbR+T5Ca7mMweEEwhBwfAtHOyMETRtuYCMaZxCPP16VUT+FV7NheyaGf2ewfRNCCEx7Cf+3YAgDfsOG5Vk43B7ApVC56YAPIJ5+viHzJMfweEZlDzKTsEsGqmd99H9PUF8o4eBrF5D8SokskRQH5teqcAIL4t6rNZlEKVorFRSpxODPlDuYMB0T3b0QpbpyZsGiqOUYiCc58jinIxe1BR/i/ut1mU45C1XBX04HXoV2bQOGJRCHGa0bSHgt1V095rgzQ3MpQG+fbLbebcg0LiBMwOKCJMrRWAxwsjvCyi2C3A0hc4nGko/Ozhi1RR/JJNPiaixx9+WqdAITjQtl9H+FKM95mDAVSIGMVjOKt1bKiMcpklmuTOr7o29DDV7cebFKNlLPmkwLuJxV2W4yPpPRTnsxvLKFk58h2lyoPnbJRHgSIzyNIJ58ui67e7RGIBF3icOUsJQjX8cYjVJUz5XQO5jA4yYqJa9qQ3VHgdYMTNeAy11m7EN5ztWlOv0xZqkKZJna0dDl8lgemqVbBxlZjTp08PD9Fd2DjMoJHViM0DApyGs8ZVw1vpzm7AyLNUjojIApXqMrKdiJrbcbMs+5EwG1L7ELJN47CDW8pc0Wc890levnAwiCPd0fo71cQZfvVOY9iNvPL8pSxdEtg8EoOVceFUjpKs8KLag6UjnjaVHLVs54ZnIgChOIZ19uyqPtIRdIclDwAoKiI96nnFMJ/K+witDQz1qXKzDZg9kghXjwZp0jSD13FmUkbKFUc/XpU+moq8kKK2iqI+q0WoSueKhWagbj4wguFyr7BckrMYcPVTrqyMYTnlampFypj6NAU1hN/Q+wnXcMSwrvpgAAAABJRU5ErkJggg=="
}, {
	"fileName": "grass_side.png",
	"reply": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB7klEQVQ4T21Sv0tbURT+XkwKMb62RiVRedLopINKdRICQhZRHDtUKhTXOhSaIo4OTv7AQbpV+j+0QgsKoouDBrMEHPxBA9VITV7Nw6QJ6SvflfO4SXuWe+493znn+865RvLLpOvz+VCr1VAsFkELBoOwbRumaSIcDqNcLsNxHIUhlvdCoQDLsmC8355yS6USeswoeBKQWcngyZsOVCoVlTTaN6jOrJNDPp9HKBRCtVqF3++HsbYz6x4tHSGxnsDhaQqBQAD25g0i7yzk1rLoXoiphDafqWL7C/v4M+NXLH9/LMJ4Ge9324YSuE3vKvrRZA+uV78rn/ZorgWVLQftb7vwc+MHnkVbcXldUDH6xof5STebs2FFnqKvM4xPX48RH4qBbzQB02cjM5dS2IP0xUOBxRdjLkFMokkxAsQIlGLi8z4+3Avj2/Ird+/k3AM/fj6Nu9RndSeAxrjuk4E0Ugx08NlV3mNCR+jqDOWdpzcDeZTKPCmNlFlE5AlViSkG+lD0wel6JbFRileAHRs1Uw6H+XpiROXLhuj/6o6rWf0jgUGuk4Mjswx6MYCHIYssWTNl1K1R9OtFvPU0OMK2TgIx1aZmBGr3dYNjJ8qgBM6FybItT4KASF0mLG/yF2T//12jXpVS5EM1rlC/s8FfURE20UrrUOIAAAAASUVORK5CYII="
}, {
	"fileName": "dirt.png",
	"reply": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABX0lEQVQ4T22TvUpDQRCF5yI2gqI2MYigSWejxE4IWIqQ0i6FD+AL+AC+grXkFQTRTrA2qIWdP2ChaZKoYCNy9Vs5y+x6p9nZ2bkzc86ZW5wfdsv7l6Fhz4NxOLfWG5bHnl5HtrwwF98vrh9CXnGwu1ku1Wbt8uYxJnB/W2zb7WkvxFSQBvLJxwomoBpGl73tDdNd0/g7OZjyiqP9nfLOGtapj8OHfpocCm9+CvxQAIfHZn3ejs+urL22EvnwBT9qLZse9JMmgQPG4iMRqY9C4NdEnidS8BIOCM60OvbeP4ls44hx+YLCGSZQNc5cPk3jJySPeFBBHCgoPjg1spK1J1IMaJV7IKmEXVz4SaVYLCB5PGbgsDBojkkhfBYNrv5B4BE51YEdWbW/RRMsycykiYzC74v48augJBBI+JqYssnvz8iyugIDCP7fSFTw/4HYVyzXv1LGfO+1ULmE/k6DH3vMML8fk45xAAAAAElFTkSuQmCC"
}, {
	"fileName": "cobblestone.png",
	"reply": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACkklEQVQ4Tz1TO0+qQRScBV+AqAgBTXwUPhIotDDGQAgxNtigiTHQW/gXDIWtiT/Blt5YWVjYQA3GYBTlLYhIfJGoaETWzLnxnub79uzuOXNmZtXu7q6+v79Hp9PB2toavr6+cHl5iWazCa/XK+tcLodarYbn52f09fXBbrfLntlshtrf39fX19cIBoMwGo3IZrMolUpYWVlBPp+Hx+ORr1IKFxcX8l1eXpaiDLW1taUDgQBubm7Q3d0tyXQ6jUgkgoeHBzw9PUmup6cH5+fnGBgYELSLi4t4fHz8V4AHCOn29hZvb2+4u7uD2+2GwWCQC6+vr7i6upJ1KBTC6empFOWY6uDgQA8NDeHw8FCSfzE8PAyXyyVdiWxzc1MusDijUqnAarVCHR0d6WQyiY+PD/j9fkFgsVhwfHws/yzEcYrFIsrlMtiMiEgm12pnZ0cQECK5INufn5/o6upCtVr9j2h8fFzG+f7+hslkApu2222oaDSqScrPz49w0Gq1oLUWiRYWFjAxMSEEk3USOTg4KJ25LzKSREr4F5lMRg6vr6+j0WiI5gx6hfn5+XnhgtKzqRQgPM5E6ISZSCTgdDrR39+PpaUlKcAci52dncHhcIhvxAcbGxuaM83NzQmRZJ3EMXp7e6XbzMyMrLlns9mwuroqa6JQ4XBYk/X393chjkjoNHan81igUCjIRQZ9QKtzn9aWESgf2SWZ8Xgc09PTmJ2dFaeNjY1J/uTkRAoQOu3OYCEVi8U0O9frdXk4ZJjfl5cX4YGcUGbmaKKRkRHJUS1Kr7a3tzW78TAfDUfhSJSS5qF9yfbU1JS4j9JRHQYlVXt7ezqVSskBdqISrMyZOdrfqyOBo6Oj8Pl84geONDk5iV/8bXXNRkJGPQAAAABJRU5ErkJggg=="
}, {
	"fileName": "stonebrick.png",
	"reply": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABuUlEQVQ4T2WTuYoCQRCGq70v8DWMTYwMfQzB1EcwMjURBAUTwecxNTYSFC+876t3v4ZqZmcrcZz+q+o/esxwOLSPx0NSqZS83285n8+Sy+Xk9XrJ5/ORYCUSCTmdThKJRMRaK+PxWMxgMLCbzcbjDoeD5PN5/3+9XruB1PP5FIZQLJvP52I6nY5dLpe+gWaGKJCDdDott9vNY2B5v9/leDyK6ff7djKZuC1BINvCpUPBsZ1Fptfr2dls9g8clKGHKocByIa56Xa7lmlabFEjVbf+wlKZsR1Zpt1uOwY0YkyYetC0y+UiyWTSJfb9fmW324mpVqv2H//AC4DEFovFxBjjGili5Nl5EI1GfUs8HveRjUYjqVQqwj0BjOvZbNYNU5mm0Wg4BmHt+/1ettutlEolB9YYwxJNq9VyAzBFLwoJ0LxardyAxWLxRyUpgKdMs9n0HnBAsQ2DAJXLZRcZEVJ6KzUZL4EXmj2NSIA6DDSlYKxKyTMIauP5er2661osFoX4lJnSZxmsTL1e9xJIgLuQyWSc03hQKBRkOp069/lCOad4dh7UajU3gFyDpXk70G/+DOSd5q/YH35oQSbAnthpAAAAAElFTkSuQmCC"
}, {
	"fileName": "crosshair.png",
	"reply": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAASklEQVQ4T2NkoCJgpKJZDPQ37D8QMAIBIV8QVAAyYNQwlGCkXZiBAppQjKHLI8cy7VyGy1WjSYNOSYPUZIGRTCg1AFk/UemMWAsBPAg0FDIa5KMAAAAASUVORK5CYII="
}];