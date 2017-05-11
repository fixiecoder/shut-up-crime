import React, { Component } from 'react';

class Graph {
  constructor(graphElement, labelElement) {
    this.canvas = graphElement;
    this.labelCanvas = labelElement;
    this.ctx = this.canvas.getContext('2d');
    this.labelCtx = this.labelCanvas.getContext('2d');
  }

  setupCanvas() {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio = this.ctx.webkitBackingStorePixelRatio ||
                              this.ctx.mozBackingStorePixelRatio ||
                              this.ctx.msBackingStorePixelRatio ||
                              this.ctx.oBackingStorePixelRatio ||
                              this.ctx.backingStorePixelRatio || 1;
    const ratio = devicePixelRatio / backingStoreRatio;
    this.canvas.width = window.innerWidth * ratio;
    this.canvas.height = window.innerHeight * ratio;
    this.labelCanvas.width = window.innerWidth * ratio;
    this.labelCanvas.height = window.innerHeight * ratio;
    this.labelCtx.font = '35px sans-serif';
    this.labelCtx.textBaseline = 'middle';
  }

  drawGraph(crimeData) {
    this.setupCanvas();
    const numberOfCrimes = crimeData.data.length;
    const numberOfUnits = (numberOfCrimes * 3) + 2;
    const unit = Math.round(this.canvas.width / numberOfUnits);
    const vUnit = (this.canvas.height / 3) / crimeData.maxCrimeCount;
    this.ctx.save();
    this.ctx.translate(0.5, 0.5);
    this.labelCtx.save();
    this.labelCtx.translate(0.5, 0.5);
    this.labelCtx.rotate(-(0.5 * Math.PI));
    crimeData.data.forEach((crime, i) => {
      const barX = ((i + 1) * (3 * unit)) - unit;
      const barValue = crime.count * vUnit;
      this.ctx.fillStyle = crime.color;
      this.ctx.fillRect(barX, this.canvas.height, unit, -barValue);
      this.labelCtx.fillText(crime.crimeType, -this.canvas.height + 10, barX + (unit / 2));
    });
    this.labelCtx.restore();
    this.ctx.restore();
  }
}

export default class GraphWrapper extends Component {

  componentDidMount() {
    this.graph = new Graph(this.graphCanvas, this.labelsCanvas);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.graphData.data) {
      this.graph.drawGraph(newProps.graphData);
    }
  }

  render() {
    const canvasStyle = {
      width: '100vw',
      height: '100vh',
      position: 'absolute',
      zIndex: 6,
      pointerEvents: 'none'
    };

    return (
      <div style={canvasStyle}>
        <canvas style={canvasStyle} ref={el => (this.graphCanvas = el)}></canvas>
        <canvas style={canvasStyle} ref={el => (this.labelsCanvas = el)}></canvas>
      </div>
    );
  }
}
