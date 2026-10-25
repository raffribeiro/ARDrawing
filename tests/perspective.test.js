const test = require('node:test');
const assert = require('node:assert/strict');
const P = require('../perspective.js');
const near = (a,b) => assert.ok(Math.abs(a-b) < 1e-7, `${a} != ${b}`);
test('identity maps corners and center without changing geometry', () => {
  const m = P.matrix(1200,900,P.identityCorners());
  for (const [x,y] of [[0,0],[1200,0],[1200,900],[0,900],[600,450]]) {
    const p=P.project(m,x,y); near(p.x,x); near(p.y,y);
  }
});
test('projective trapezoid pins all four corners exactly', () => {
  const q=[{x:.2,y:.1},{x:.8,y:.2},{x:1.1,y:.9},{x:-.1,y:1}];
  const m=P.matrix(1200,900,q);
  [[0,0],[1200,0],[1200,900],[0,900]].forEach(([x,y],i)=>{
    const p=P.project(m,x,y); near(p.x,q[i].x*1200); near(p.y,q[i].y*900);
  });
});
test('reject crossing, concave, collapsed and malformed corners', () => {
  for(const q of [[],null,[{x:NaN,y:0},...P.identityCorners().slice(1)],
    [{x:0,y:0},{x:1,y:1},{x:1,y:0},{x:0,y:1}],
    [{x:0,y:0},{x:1,y:0},{x:.1,y:.1},{x:0,y:1}],
    [{x:0,y:0},{x:1,y:0},{x:1,y:0},{x:0,y:0}]]) assert.equal(P.validCorners(q),false);
});
test('screen and local coordinates round trip after rotate, scale and translate', () => {
  const state={x:57,y:-30,s:.43,r:.7};
  const p={x:130,y:800}, size={width:1200,height:900}, viewport={width:390,height:844};
  const screen=P.toScreen(p,state,size,viewport), local=P.toLocal(screen,state,size,viewport);
  near(local.x,p.x); near(local.y,p.y);
});
test('matrix rejects invalid geometry and dimensions', () => {
  assert.equal(P.matrix(0,900,P.identityCorners()),null);
  assert.equal(P.matrix(1200,900,[]),null);
});
