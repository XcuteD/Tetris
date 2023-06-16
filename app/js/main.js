figure = {
    direction: 'up',
    dropDelay: 1000,
    fallingTimerId: 0,
    droped: false,

    create: function() {
        console.log('new');
        if (field.get(this.position[0][0], this.position[0][1]) == true) {
            this.stop()
        } else {
            field.set(this.position, true)
            this.control()
            this.falling(this.dropDelay)
        }
    },

    falling: function(delay) {
        let droped = false
        this.fallingTimerId = setInterval(() => {
            this.bottomBorder.forEach((pos) => {
                if (pos[0] == field.getHeight() - 1) {
                    this.droped = true
                } else if ( field.get(pos[0] + 1, pos[1]) ) {
                    this.droped = true
                }
            })
            if (this.droped) {
                clearInterval(this.fallingTimerId)
                field.checkLines(this.position)
                queueFigures.add()
            } else {
                field.set(this.position, false)
                this.position.forEach((pos) => {
                    pos[0]++
                })
                field.set(this.position, true)
                this.bottomBorder.forEach(pos => {
                    pos[0]++
                });
                this.leftBorder.forEach(pos => {
                    pos[0]++
                });
                this.rightBorder.forEach(pos => {
                    pos[0]++
                });
            }
        }, delay);   
    },

    stop: function() {
        document.querySelector('.info__speed').innerHTML = ''
        document.querySelector('.info__line').innerHTML = 'GAME OVER'
        document.querySelector('.info__score-text').innerHTML = 'YOUR SCORE: '
    },

    control: function() {
        document.addEventListener('keydown', (event) => {
            if (!this.droped) {
                switch (event.code) {
                    case 'KeyE':
                        this.rotateClockwise()
                        break
                    case 'KeyQ':
                        this.rotateCounterClockwise()
                        break
                    case 'KeyD':
                        this.moveRight()
                        break
                    case 'KeyA':
                        this.moveLeft()
                        break
                    case 'KeyS':
                        this.moveDown()
                        break
                }
            }
        });
    },

    moveRight: function() {
        let blocked = false

        this.rightBorder.forEach((pos) => {
            if (field.get(pos[0], pos[1] + 1) != false) {
                blocked = true
            }
        })
        if(!blocked) {
            field.set(this.position, false)
            this.position.forEach((pos) => {
                pos[1]++
            })
            field.set(this.position, true)
            this.bottomBorder.forEach(pos => {
                pos[1]++
            })
            this.rightBorder.forEach(pos => {
                pos[1]++
            })
            this.leftBorder.forEach(pos => {
                pos[1]++
            })
            field.set(this.position, true)
        }
    },

    moveLeft: function() {
        let blocked = false

        this.leftBorder.forEach((pos) => {
            if (field.get(pos[0], pos[1] - 1) != false) {
                blocked = true
            }
        })
        if(!blocked) {
            field.set(this.position, false)
            this.position.forEach((pos) => {
                pos[1]--
            })
            field.set(this.position, true)
            this.bottomBorder.forEach(pos => {
                pos[1]--
            })
            this.leftBorder.forEach(pos => {
                pos[1]--
            })
            this.rightBorder.forEach(pos => {
                pos[1]--
            })
            field.set(this.position, true)
        }
    },

    moveDown: function() {
        this.bottomBorder.forEach(pos => {
            if (pos[0] == field.getHeight() - 1) {
                this.droped = true
            } else if ( field.get(pos[0] + 1, pos[1]) ) {
                this.droped = true
            }
        });

        if(this.droped) {
            clearInterval(this.fallingTimerId)
            field.checkLines(this.position)
            queueFigures.add()
        } else {
            field.set(this.position, false)
            this.position.forEach((pos) => {
                pos[0]++
            })
            field.set(this.position, true)
            this.bottomBorder.forEach(pos => {
                pos[0]++
            })
            this.leftBorder.forEach(pos => {
                pos[0]++
            })
            this.rightBorder.forEach(pos => {
                pos[0]++
            })
            field.set(this.position, true)
        }
    },
}


function FigureZet() {
    this.position = [[0,3], [0,4], [1,4], [1,5]]
    this.bottomBorder = [[0,3], [1,4], [1,5]]
    this.rightBorder = [[0,4], [1,5]]
    this.leftBorder = [[0,3], [1,4]]

    this.rotateClockwise = function() {
        field.set(this.position, false)
        switch (this.direction) {
            case 'up':
                if (field.get(this.position[1][0] + 1, this.position[1][1]) == false &&
                    field.get(this.position[3][0] + 1, this.position[3][1] - 2) == false) {
                        this.position[0][1]+=1
                        this.position[1][0]+=1
                        this.position[1][1]-=1
                        this.position[3][0]+=1
                        this.position[3][1]-=2
                        this.bottomBorder[0] = [...this.position[3]]
                        this.bottomBorder[1] = [...this.position[2]]
                        this.bottomBorder.splice(2, 1)
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder[1] = [...this.position[1]]
                        this.leftBorder[2] = [...this.position[3]]
                        this.rightBorder[0] = [...this.position[0]]
                        this.rightBorder[1] = [...this.position[2]]
                        this.rightBorder[2] = [...this.position[3]]
                        this.direction = 'left'
                    }
                break
            case 'left':
                if (field.get(this.position[0][0], this.position[0][1] - 1) == false &&
                    field.get(this.position[3][0] - 1, this.position[3][1] + 2) == false) {
                        this.position[0][1]-=1
                        this.position[1][0]-=1
                        this.position[1][1]+=1
                        this.position[3][0]-=1
                        this.position[3][1]+=2
                        this.bottomBorder[0] = [...this.position[0]]
                        this.bottomBorder[1] = [...this.position[2]]
                        this.bottomBorder[2] = [...this.position[3]]
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder[1] = [...this.position[2]]
                        this.leftBorder.splice(2, 1)
                        this.rightBorder[0] = [...this.position[1]]
                        this.rightBorder[1] = [...this.position[3]]
                        this.rightBorder.splice(2, 1)
                        this.direction = 'up'
                    }
                break
        }
        field.set(this.position, true)
    }

    this.rotateCounterClockwise = function() {
        this.rotateClockwise()
    }

    this.__proto__ = figure
}


function FigureReverseZet() {
    this.position = [[0,4], [0,5], [1,3], [1,4]]
    this.bottomBorder = [[1,3], [1,4], [0,5]]
    this.rightBorder = [[0,5], [1,4]]
    this.leftBorder = [[0,4], [1,3]]

    this.rotateClockwise = function() {
        field.set(this.position, false)
        switch (this.direction) {
            case 'up':
                if (field.get(this.position[1][0], this.position[1][1] - 2) == false &&
                    field.get(this.position[0][0] + 2, this.position[0][1]) == false) {
                        this.position[0][1]-=1
                        this.position[1][1]-=2
                        this.position[1][0]+=1
                        this.position[2][1]+=1
                        this.position[3][0]+=1
                        this.bottomBorder[1] = [...this.position[3]]
                        this.bottomBorder.splice(2, 1)
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder[2] = [...this.position[3]]
                        this.rightBorder[0] = [...this.position[0]]
                        this.rightBorder[2] = [...this.position[3]]
                        this.direction = 'left'
                    }
                break
            case 'left':
                if (field.get(this.position[0][0], this.position[0][1] + 2) == false &&
                    field.get(this.position[3][0] - 2, this.position[3][1]) == false) {
                        this.position[0][1]+=1
                        this.position[1][1]+=2
                        this.position[1][0]-=1
                        this.position[2][1]-=1
                        this.position[3][0]-=1
                        this.bottomBorder[1] = [...this.position[3]]
                        this.bottomBorder[2] = [...this.position[1]]
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder.splice(2, 1)
                        this.rightBorder[0] = [...this.position[1]]
                        this.leftBorder.splice(2, 1)
                        this.direction = 'up'
                    }
                break
        }
        field.set(this.position, true)
    }

    this.rotateCounterClockwise = function() {
        this.rotateClockwise()
    }

    this.__proto__ = figure
}


function FigureSpike() {
    this.position = [[0,4], [1,3], [1,4], [1,5]]
    this.bottomBorder = [[1,3], [1,4], [1,5]]
    this.rightBorder = [[0,4], [1,5]]
    this.leftBorder = [[0,4], [1,3]]

    this.rotateClockwise = function() {
        field.set(this.position, false)
        switch (this.direction) {
            case 'up':
                if (field.get(this.position[2][0] + 1, this.position[2][1]) == false) {
                        this.position[1][1]+=1
                        this.position[2][1]+=1
                        this.position[3][0]+=1
                        this.position[3][1]-=1
                        this.bottomBorder[0] = [...this.position[3]]
                        this.bottomBorder[1] = [...this.position[2]]
                        this.bottomBorder.splice(2, 1)
                        this.leftBorder[1] = [...this.position[1]]
                        this.leftBorder[2] = [...this.position[3]]
                        this.rightBorder[2] = [...this.position[3]]
                        this.direction = 'right'
                    }
                break
            case 'right':
                if (field.get(this.position[1][0], this.position[1][1] - 1) == false) {
                        this.position[0][0]+=1
                        this.position[0][1]-=1
                        this.bottomBorder[0] = [...this.position[0]]
                        this.bottomBorder[1] = [...this.position[3]]
                        this.bottomBorder[2] = [...this.position[2]]
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder[1] = [...this.position[3]]
                        this.leftBorder.splice(2, 1)
                        this.rightBorder[0] = [...this.position[2]]
                        this.rightBorder[1] = [...this.position[3]]
                        this.rightBorder.splice(2, 1)
                        this.direction = 'down'
                    }
                break
            case 'down':
                if (field.get(this.position[1][0] - 1, this.position[1][1]) == false) {
                        this.position[0][0]-=1
                        this.position[0][1]+=1
                        this.position[1][1]-=1
                        this.position[2][1]-=1
                        this.bottomBorder[0] = [...this.position[1]]
                        this.bottomBorder[1] = [...this.position[3]]
                        this.bottomBorder.splice(2, 1)
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder[1] = [...this.position[1]]
                        this.leftBorder[2] = [...this.position[3]]
                        this.rightBorder[0] = [...this.position[0]]
                        this.rightBorder[1] = [...this.position[2]]
                        this.rightBorder[2] = [...this.position[3]]
                        this.direction = 'left'
                    }
                break
            case 'left':
                if (field.get(this.position[2][0], this.position[2][1] + 1) == false) {
                        this.position[3][0]-=1
                        this.position[3][1]+=1
                        this.bottomBorder[1] = [...this.position[2]]
                        this.bottomBorder[2] = [...this.position[3]]
                        this.leftBorder.splice(2, 1)
                        this.rightBorder[1] = [...this.position[3]]
                        this.rightBorder.splice(2, 1)
                        this.direction = 'up'
                    }
                break
        }
        field.set(this.position, true)
    }

    this.rotateCounterClockwise = function() {
        field.set(this.position, false)
        switch (this.direction) {
            case 'right':
                if (field.get(this.position[1][0], this.position[1][1] - 1) == false) {
                        this.position[1][1]-=1
                        this.position[2][1]-=1
                        this.position[3][0]-=1
                        this.position[3][1]+=1
                        this.bottomBorder[0] = [...this.position[1]]
                        this.bottomBorder[1] = [...this.position[2]]
                        this.bottomBorder[2] = [...this.position[3]]
                        this.leftBorder[1] = [...this.position[1]]
                        this.leftBorder.splice(2,1)
                        this.rightBorder.splice(2,1)
                        this.direction = 'up'
                    }
                break
            case 'down':
                if (field.get(this.position[1][0] - 1, this.position[1][1]) == false) {
                        this.position[0][0]-=1
                        this.position[0][1]+=1
                        this.bottomBorder[0] = [...this.position[3]]
                        this.bottomBorder[1] = [...this.position[2]]
                        this.bottomBorder.splice(2,1)
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder[1] = [...this.position[1]]
                        this.leftBorder[2] = [...this.position[3]]
                        this.rightBorder[0] = [...this.position[0]]
                        this.rightBorder[1] = [...this.position[2]]
                        this.rightBorder[2] = [...this.position[3]]
                        this.direction = 'right'
                    }
                break
            case 'left':
                if (field.get(this.position[2][0], this.position[2][1] + 1) == false) {
                        this.position[0][0]+=1
                        this.position[0][1]-=1
                        this.position[1][1]+=1
                        this.position[2][1]+=1
                        this.bottomBorder[0] = [...this.position[0]]
                        this.bottomBorder[1] = [...this.position[3]]
                        this.bottomBorder[2] = [...this.position[2]]
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder[1] = [...this.position[3]]
                        this.leftBorder.splice(2,1)
                        this.rightBorder[0] = [...this.position[2]]
                        this.rightBorder[1] = [...this.position[3]]
                        this.rightBorder.splice(2,1)
                        this.direction = 'down'
                    }
                break
            case 'up':
                if (field.get(this.position[2][0] + 1, this.position[2][1]) == false) {
                        this.position[3][0]+=1
                        this.position[3][1]-=1
                        this.bottomBorder[1] = [...this.position[3]]
                        this.bottomBorder.splice(2, 1)
                        this.leftBorder[2] = [...this.position[3]]
                        this.rightBorder[1] = [...this.position[2]]
                        this.rightBorder[2] = [...this.position[3]]
                        this.direction = 'left'
                    }
                break
        }
        field.set(this.position, true)
    }

    this.__proto__ = figure
}


function FigureСrutch() {
    this.position = [[0,4], [0,5], [1,4], [2,4]]
    this.bottomBorder = [[2,4], [0,5]]
    this.rightBorder = [[0,5], [1,4], [2,4]]
    this.leftBorder = [[0,4], [1,4], [2,4]]

    this.rotateClockwise = function() {
        field.set(this.position, false)
        switch (this.direction) {
            case 'up':
                if (field.get(this.position[0][0], this.position[0][1] - 1) == false &&
                    field.get(this.position[1][0] + 1, this.position[1][1]) == false) {
                        this.position[0][1]-=1
                        this.position[1][1]-=1
                        this.position[2][0]-=1
                        this.position[2][1]+=1
                        this.position[3][0]-=1
                        this.position[3][1]+=1
                        this.bottomBorder[0] = [...this.position[0]]
                        this.bottomBorder[1] = [...this.position[1]]
                        this.bottomBorder[2] = [...this.position[3]]
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder[1] = [...this.position[3]]
                        this.rightBorder[0] = [...this.position[2]]
                        this.rightBorder[1] = [...this.position[3]]
                        this.rightBorder.splice(2, 1)
                        this.direction = 'right'
                    }
                break
            case 'right':
                if (field.get(this.position[1][0] + 2, this.position[1][1]) == false &&
                    field.get(this.position[2][0] + 2, this.position[2][1]) == false) {
                        this.position[0][1]+=2
                        this.position[1][0]+=1
                        this.position[1][1]+=1
                        this.position[2][0]+=2
                        this.position[2][1]-=1
                        this.position[3][0]+=1
                        this.bottomBorder[0] = [...this.position[2]]
                        this.bottomBorder[1] = [...this.position[3]]
                        this.bottomBorder.splice(2,1)
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder[1] = [...this.position[1]]
                        this.leftBorder[2] = [...this.position[2]]
                        this.rightBorder[0] = [...this.position[0]]
                        this.rightBorder[1] = [...this.position[1]]
                        this.rightBorder[2] = [...this.position[3]]
                        this.direction = 'down'
                    }
                break
            case 'down':
                if (field.get(this.position[0][0], this.position[0][1] - 2) == false &&
                    field.get(this.position[1][0], this.position[1][1] - 2) == false &&
                    field.get(this.position[1][0], this.position[1][1] - 1) == false) {
                        this.position[0][1]-=2
                        this.position[1][1]-=2
                        this.position[2][0]-=1
                        this.position[3][0]-=1
                        this.bottomBorder[0] = [...this.position[1]]
                        this.bottomBorder[1] = [...this.position[2]]
                        this.bottomBorder[2] = [...this.position[3]]
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder[1] = [...this.position[1]]
                        this.leftBorder.splice(2,1)
                        this.rightBorder[0] = [...this.position[0]]
                        this.rightBorder[1] = [...this.position[3]]
                        this.rightBorder.splice(2,1)
                        this.direction = 'left'
                    }
                break
            case 'left':
                if (field.get(this.position[2][0] - 1, this.position[2][1]) == false &&
                    field.get(this.position[2][0] + 1, this.position[2][1]) == false &&
                    field.get(this.position[3][0] - 1, this.position[3][1]) == false) {
                        this.position[0][1]+=1
                        this.position[1][0]-=1
                        this.position[1][1]+=2
                        this.position[3][0]+=1
                        this.position[3][1]-=1
                        this.bottomBorder[0] = [...this.position[3]]
                        this.bottomBorder[1] = [...this.position[1]]
                        this.bottomBorder.splice(2,1)
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder[1] = [...this.position[2]]
                        this.leftBorder[2] = [...this.position[3]]
                        this.rightBorder[0] = [...this.position[1]]
                        this.rightBorder[1] = [...this.position[2]]
                        this.rightBorder[2] = [...this.position[3]]
                        this.direction = 'up'
                    }
                break
        }
        field.set(this.position, true)
    }
    
    this.rotateCounterClockwise = function() {
        
    }

    this.__proto__ = figure
}


function FigureReverseСrutch() {
    this.position = [[0,4], [0,5], [1,5], [2,5]]
    this.bottomBorder = [[0,4], [2,5]]
    this.rightBorder = [[0,5], [1,5], [2,5]]
    this.leftBorder = [[0,4], [1,5], [2,5]]

    this.rotateClockwise = function() {
        field.set(this.position, false)
        switch (this.direction) {
            case 'up':
                if (field.get(this.position[0][0], this.position[0][1] + 2) == false &&
                    field.get(this.position[2][0], this.position[2][1] + 1) == false &&
                    field.get(this.position[2][0], this.position[2][1] - 1) == false) {
                        this.position[0][1]+=2
                        this.position[1][0]+=1
                        this.position[1][1]-=1
                        this.position[3][0]-=1
                        this.position[3][1]+=1
                        this.bottomBorder[0] = [...this.position[1]]
                        this.bottomBorder[1] = [...this.position[2]]
                        this.bottomBorder[2] = [...this.position[3]]
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder[1] = [...this.position[1]]
                        this.leftBorder.splice(2, 1)
                        this.rightBorder[0] = [...this.position[0]]
                        this.rightBorder[1] = [...this.position[3]]
                        this.rightBorder.splice(2, 1)
                        this.direction = 'right'
                    }
                break
            case 'right':
                if (field.get(this.position[0][0], this.position[0][1] - 1) == false &&
                    field.get(this.position[2][0] + 1, this.position[1][1]) == false &&
                    field.get(this.position[3][0] + 1, this.position[2][1]) == false) {
                        this.position[0][1]-=1
                        this.position[1][1]+=1
                        this.position[2][0]+=1
                        this.position[3][0]+=1
                        this.bottomBorder[0] = [...this.position[2]]
                        this.bottomBorder[1] = [...this.position[3]]
                        this.bottomBorder.splice(2,1)
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder[1] = [...this.position[1]]
                        this.leftBorder[2] = [...this.position[2]]
                        this.rightBorder[0] = [...this.position[0]]
                        this.rightBorder[1] = [...this.position[1]]
                        this.rightBorder[2] = [...this.position[3]]
                        this.direction = 'down'
                    }
                break
            case 'down':
                if (field.get(this.position[1][0], this.position[1][1] + 1) == false &&
                    field.get(this.position[1][0], this.position[1][1] - 1) == false &&
                    field.get(this.position[2][0], this.position[2][1] - 1) == false) {
                        this.position[0][0]+=1
                        this.position[0][1]-=1
                        this.position[2][0]-=1
                        this.position[2][1]+=1
                        this.position[3][1]-=2
                        this.bottomBorder[0] = [...this.position[3]]
                        this.bottomBorder[1] = [...this.position[1]]
                        this.bottomBorder[2] = [...this.position[2]]
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder[1] = [...this.position[3]]
                        this.leftBorder.splice(2,1)
                        this.rightBorder[0] = [...this.position[2]]
                        this.rightBorder[1] = [...this.position[3]]
                        this.rightBorder.splice(2,1)
                        this.direction = 'left'
                    }
                break
            case 'left':
                if (field.get(this.position[0][0] - 1, this.position[0][1]) == false &&
                    field.get(this.position[1][0] - 1, this.position[1][1]) == false &&
                    field.get(this.position[3][0], this.position[3][1] + 1) == false) {
                        this.position[0][0]-=1
                        this.position[1][0]-=1
                        this.position[2][1]-=1
                        this.position[3][1]+=1
                        this.bottomBorder[0] = [...this.position[0]]
                        this.bottomBorder[1] = [...this.position[3]]
                        this.bottomBorder.splice(2,1)
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder[1] = [...this.position[2]]
                        this.leftBorder[2] = [...this.position[3]]
                        this.rightBorder[0] = [...this.position[1]]
                        this.rightBorder[1] = [...this.position[2]]
                        this.rightBorder[2] = [...this.position[3]]
                        this.direction = 'up'
                    }
                break
        }
        field.set(this.position, true)
    }
    
    this.rotateCounterClockwise = function() {
        field.set(this.position, false)
        switch (this.direction) {
            case 'right':
                if (field.get(this.position[0][0], this.position[0][1] - 2) == false &&
                    field.get(this.position[0][0], this.position[0][1] - 1) == false &&
                    field.get(this.position[2][0] + 1, this.position[2][1]) == false) {
                        this.position[0][1]-=2
                        this.position[1][0]-=1
                        this.position[1][1]+=1
                        this.position[3][0]+=1
                        this.position[3][1]-=1
                        this.bottomBorder[0] = [...this.position[0]]
                        this.bottomBorder[1] = [...this.position[3]]
                        this.bottomBorder.splice(2,1)
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder[1] = [...this.position[2]]
                        this.leftBorder[2] = [...this.position[3]]
                        this.rightBorder[0] = [...this.position[1]]
                        this.rightBorder[1] = [...this.position[2]]
                        this.rightBorder[2] = [...this.position[3]]
                        this.direction = 'up'
                    }
                break
            case 'down':
                if (field.get(this.position[0][0], this.position[0][1] + 1) == false &&
                    field.get(this.position[1][0], this.position[1][1] + 1) == false &&
                    field.get(this.position[1][0], this.position[1][1] - 1) == false) {
                        this.position[0][1]+=1
                        this.position[1][1]-=1
                        this.position[2][0]-=1
                        this.position[3][0]-=1
                        this.bottomBorder[0] = [...this.position[1]]
                        this.bottomBorder[1] = [...this.position[2]]
                        this.bottomBorder[2] = [...this.position[3]]
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder[1] = [...this.position[1]]
                        this.leftBorder.splice(2, 1)
                        this.rightBorder[0] = [...this.position[0]]
                        this.rightBorder[1] = [...this.position[3]]
                        this.rightBorder.splice(2, 1)
                        this.direction = 'right'
                    }
                break
            case 'left':
                if (field.get(this.position[1][0] - 1, this.position[1][1]) == false &&
                    field.get(this.position[1][0] + 1, this.position[1][1]) == false &&
                    field.get(this.position[2][0] + 1, this.position[2][1]) == false) {
                        this.position[0][0]-=1
                        this.position[0][1]+=1
                        this.position[2][0]+=1
                        this.position[2][1]-=1
                        this.position[3][1]+=2
                        this.bottomBorder[0] = [...this.position[2]]
                        this.bottomBorder[1] = [...this.position[3]]
                        this.bottomBorder.splice(2,1)
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder[1] = [...this.position[1]]
                        this.leftBorder[2] = [...this.position[2]]
                        this.rightBorder[0] = [...this.position[0]]
                        this.rightBorder[1] = [...this.position[1]]
                        this.rightBorder[2] = [...this.position[3]]
                        this.direction = 'down'
                    }
                break
            case 'up':
                if (field.get(this.position[2][0], this.position[2][1] + 1) == false &&
                    field.get(this.position[2][0], this.position[2][1] - 1) == false &&
                    field.get(this.position[3][0], this.position[3][1] - 1) == false) {
                        this.position[0][0]+=1
                        this.position[1][0]+=1
                        this.position[2][1]+=1
                        this.position[3][1]-=1
                        this.bottomBorder[0] = [...this.position[3]]
                        this.bottomBorder[1] = [...this.position[1]]
                        this.bottomBorder[2] = [...this.position[2]]
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder[1] = [...this.position[3]]
                        this.leftBorder.splice(2,1)
                        this.rightBorder[0] = [...this.position[2]]
                        this.rightBorder[1] = [...this.position[3]]
                        this.rightBorder.splice(2,1)
                        this.direction = 'left'
                    }
                break
        }
        field.set(this.position, true)
    }

    this.__proto__ = figure
}


function FigureBone() {
    this.position = [[0,4], [1,4], [2,4], [3,4]]
    this.bottomBorder = [[3,4]]
    this.rightBorder = [[0,4], [1,4], [2,4], [3,4]]
    this.leftBorder = [[0,4], [1,4], [2,4], [3,4]]

    this.rotateClockwise = function() {
        field.set(this.position, false)
        switch (this.direction) {
            case 'up':
                if (field.get(this.position[0][0] + 1, this.position[0][1] - 1) == false &&
                    field.get(this.position[2][0] - 1, this.position[2][1] + 1) == false &&
                    field.get(this.position[3][0] - 2, this.position[3][1] + 2) == false) {
                        this.position[0][0]+=1
                        this.position[0][1]-=1
                        this.position[2][0]-=1
                        this.position[2][1]+=1
                        this.position[3][0]-=2
                        this.position[3][1]+=2
                        this.bottomBorder[0] = [...this.position[0]]
                        this.bottomBorder[1] = [...this.position[1]]
                        this.bottomBorder[2] = [...this.position[2]]
                        this.bottomBorder[3] = [...this.position[3]]
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder.splice(1, 3)
                        this.rightBorder[0] = [...this.position[3]]
                        this.rightBorder.splice(1, 3)
                        this.direction = 'left'
                    }
                break
            case 'left':
                if (field.get(this.position[0][0] - 1, this.position[0][1] + 1) == false &&
                    field.get(this.position[2][0] + 1, this.position[2][1] - 1) == false &&
                    field.get(this.position[3][0] + 2, this.position[3][1] - 2) == false) {
                        this.position[0][0]-=1
                        this.position[0][1]+=1
                        this.position[2][0]+=1
                        this.position[2][1]-=1
                        this.position[3][0]+=2
                        this.position[3][1]-=2
                        this.bottomBorder[0] = [...this.position[3]]
                        this.bottomBorder.splice(1,3)
                        this.leftBorder[0] = [...this.position[0]]
                        this.leftBorder[1] = [...this.position[1]]
                        this.leftBorder[2] = [...this.position[2]]
                        this.leftBorder[3] = [...this.position[3]]
                        this.rightBorder[0] = [...this.position[0]]
                        this.rightBorder[1] = [...this.position[1]]
                        this.rightBorder[2] = [...this.position[2]]
                        this.rightBorder[3] = [...this.position[3]]
                        this.direction = 'up'
                    }
                break
        }
        field.set(this.position, true)
    }
    
    this.rotateCounterClockwise = function() {
        this.rotateClockwise()
    }

    this.__proto__ = figure
}


function FigureCube() {
    this.position = [[0,4], [0,5], [1,4], [1,5]]
    this.bottomBorder = [[1,4], [1,5]]
    this.rightBorder = [[0,5], [1,5]]
    this.leftBorder = [[0,4], [1,4]]

    this.rotateClockwise = function() {
    }
    
    this.rotateCounterClockwise = function() {
        this.rotateClockwise()
    }

    this.__proto__ = figure
}


function Field() {
    let field = []
    let height = 20
    let width = 10
    let clearLines = 0
    let speed = 1
    let score = 0
    let infoSpeed = document.querySelector('.info__speed-num')
    let infoLine = document.querySelector('.info__line-num')
    let infoScore = document.querySelector('.info__score-num')


    let create = (function() {
        for(let i = 0; i < height; i++) {
            field.push(Array(width).fill(false))
        }
    })()

    let draw = (function() {
        setInterval(() => {
            for(let i = 0; i < height; i++) {
                for(let j = 0; j < width; j++) {
                    let cell = document.querySelector(`.y-${i} .x-${j}`)
                    if ( field[i][j] ^ cell.classList.contains('grid__cell_fill') ) {
                        cell.classList.toggle('grid__cell_fill')
                    }
                }
            }
        }, 100);
    })()

    this.checkLines= function(position) {
        let lines = []
        position.forEach(pos => {
            if (!lines.includes(pos[0])) {
                lines.push(pos[0])
            }
        })

        lines.forEach(line => {
            if ( field[line].every(cell => {
                return cell == true
            }) ) {
                this.clearLine(line)
            }
        })
    }

    this.clearLine = function(line) {
        for(let i = line; i > 0; i--) {
            field[i] = [...field[i - 1]]
        }
        field[0].fill(false)
        
        infoLine.innerHTML = String(++clearLines)
        score += 100 * speed
        infoScore.innerHTML = String(score)
        speed = parseInt(clearLines / 10) + 1
        infoSpeed.innerHTML = String(speed)
        //figure.dropDelay = 1000 - speed * 100 + 100
        figure.dropDelay = parseInt(1000 / speed)
    }

    this.set = function(position, value) {
        position.forEach((pos) => {
            field[pos[0]][pos[1]] = value
        })
    }

    this.get = function(pos1, pos2) {
        if (field[pos1] !== undefined) {
            return field[pos1][pos2]
        } else {
            return true
        }
    }

    this.getHeight = function() {
        return height
    }
}


function QueueFigures() {
    let figures = [FigureReverseСrutch, FigureСrutch, FigureBone, FigureCube, FigureReverseZet, FigureZet, FigureSpike]
    this.next = null
    this.active = null

    this.add = function() {
        if (this.active === null) {
            this.active = new figures[Math.floor(Math.random() * figures.length)]
            this.next = new figures[Math.floor(Math.random() * figures.length)]
            this.active.create()
        } else {
            this.active = this.next
            this.next = new figures[Math.floor(Math.random() * figures.length)]
            this.active.create()
        }
    }
}


let field = new Field()
let queueFigures = new QueueFigures()
queueFigures.add()



