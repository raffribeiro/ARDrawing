/* Pure geometry shared by the browser and the regression tests. */
(function(root, factory){
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Perspective = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function(){
  'use strict';
  const identityCorners = () => [{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:0,y:1}];
  function validCorners(q){
    if (!Array.isArray(q) || q.length !== 4 || q.some(p => !p || !Number.isFinite(p.x) || !Number.isFinite(p.y))) return false;
    // Preserve clockwise winding and a margin against collapse / singularities.
    for (let i=0;i<4;i++){
      const a=q[i], b=q[(i+1)%4], c=q[(i+2)%4];
      if ((b.x-a.x)*(c.y-b.y)-(b.y-a.y)*(c.x-b.x) < .002) return false;
    }
    return true;
  }
  function matrix(w,h,q){
    if (!(w>0 && h>0) || !validCorners(q)) return null;
    const [a,b,c,d]=q;
    const dx1=b.x-c.x, dx2=d.x-c.x, dx3=a.x-b.x+c.x-d.x;
    const dy1=b.y-c.y, dy2=d.y-c.y, dy3=a.y-b.y+c.y-d.y;
    const det=dx1*dy2-dx2*dy1;
    if (Math.abs(det)<1e-12) return null;
    const g=(dx3*dy2-dx2*dy3)/det, j=(dx1*dy3-dx3*dy1)/det;
    const m=[b.x-a.x+g*b.x,(b.y-a.y+g*b.y)*h/w,0,g/w,
      (d.x-a.x+j*d.x)*w/h,d.y-a.y+j*d.y,0,j/h,
      0,0,1,0,a.x*w,a.y*h,0,1];
    // No projective horizon may cross the image.
    if ([1,1+g,1+j,1+g+j].some(v=>v<=1e-8) || m.some(v=>!Number.isFinite(v))) return null;
    return m;
  }
  function project(m,x,y){
    const z=m[3]*x+m[7]*y+m[15];
    return {x:(m[0]*x+m[4]*y+m[12])/z,y:(m[1]*x+m[5]*y+m[13])/z};
  }
  function toScreen(p,s,size,viewport){
    const x=(p.x-size.width/2)*s.s, y=(p.y-size.height/2)*s.s, c=Math.cos(s.r), n=Math.sin(s.r);
    return {x:viewport.width/2+s.x+x*c-y*n,y:viewport.height/2+s.y+x*n+y*c};
  }
  function toLocal(p,s,size,viewport){
    const x=p.x-viewport.width/2-s.x,y=p.y-viewport.height/2-s.y,c=Math.cos(s.r),n=Math.sin(s.r);
    return {x:(x*c+y*n)/s.s+size.width/2,y:(-x*n+y*c)/s.s+size.height/2};
  }
  return {identityCorners,validCorners,matrix,project,toScreen,toLocal};
});
