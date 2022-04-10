const HeaderCorner = () => {
    let start = {x: 100, y: 100};
    let controlPoint1 = {x: 100, y: 200};
    let controlPoint2 = {x: 200, y: 200};
    let endPoint = {x: 200, y: 100};

    ctx.moveTo(start.x, start.y); //Move to start point
    ctx.bezierCurveTo(
    controlPoint1.x, controlPoint1.y,
    controlPoint2.x, controlPoint2.y,
    endPoint.x, endPoint.y
    ); //Draw curve
    ctx.stroke(); //Draw outline
    return (
        <div>Hola</div>
    )
}