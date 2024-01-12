import { Component } from '@angular/core';

const addedValueArray: number[] = []
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  positiveArray:number[]=[]
  negativeArray:number[]=[]
  addedValueArray: number[] = addedValueArray
  title = 'Bomber_Games';
  pointCount: number = 0
  gamePoint: number[] = []
  cols: number = 3
  gameOverStatus: boolean = false
  gameWinStatus: boolean = false
  clickedIndex!: number
  totalPoints: number = 0
  matrixLimit: number = 3
  limit: number = 0
  givenRandomValue: number = 0
  show: boolean = true
  level: number = 1

  ngOnInit() {
    this.mainFunction()
  }

  mainFunction() {
    this.limit = this.matrixLimit * this.matrixLimit
    for (let i = 0; i < this.limit; i++) {
      this.givenRandomValue = Math.floor(Math.random() * (this.level * 25) - (this.level * 10))
      if (!this.gamePoint.includes(this.givenRandomValue)) {
        this.gamePoint.push(this.givenRandomValue)
        if (this.givenRandomValue > 0) {
          this.totalPoints += this.givenRandomValue
        }
      } else {
        this.limit += 1
      }
    }

    this.gamePoint.forEach((e:number)=> (e>0) ? this.positiveArray.push(e) : this.negativeArray.push(e))
  }

  changes(value: number, i: number): void {
    if (value > 0) {
      this.gameOverStatus = false
      if (!addedValueArray.includes(value)) {
        addedValueArray.push(value)
        this.clickedIndex = i
        this.pointCount += value

        if (this.pointCount === this.totalPoints) {
          this.show = false
          this.gameOverStatus = false
          this.gameWinStatus = true
        }
      }
      else {
        null
      }
    } else {
      this.clickedIndex = i
      this.show = false
      this.gameWinStatus = false
      this.gameOverStatus = true
    }
  }

  refresh(): void {
    this.show = true
    this.limit = 0
    this.givenRandomValue = 0
    this.totalPoints = 0
    this.gamePoint.splice(0, this.gamePoint.length)
    this.gameOverStatus = false
    this.gameWinStatus = false
    this.addedValueArray.splice(0, this.addedValueArray.length)
    this.pointCount = 0
    this.cols = 3
    this.clickedIndex = -1
    this.matrixLimit = 3
    this.level = 1
    this.mainFunction()
  }

  nextLevel(): void {
    this.show = true
    this.limit = 0
    this.givenRandomValue = 0
    this.totalPoints = 0
    this.gamePoint.splice(0, this.gamePoint.length)
    this.gameOverStatus = false
    this.gameWinStatus = false
    this.addedValueArray.splice(0, this.addedValueArray.length)
    this.pointCount = 0
    this.matrixLimit += 1
    this.cols += 1
    this.clickedIndex = -1
    this.level += 1
    this.mainFunction()
  }
}