import sankeyDiagram from '../src/diagram';

import d3 from 'd3';
import test from 'tape';


test('groups: draws box around nodes', t => {
  // prepare data
  const processes = [
  ];

  const flows = [
    {source: 'a1', target: 'b', value: 1},
    {source: 'a2', target: 'b', value: 1},
  ];

  const groups = [
    {title: 'Group', processes: ['a1', 'a2']},
    {title: 'B', processes: ['b']},
  ];

  // diagram
  const diagram = sankeyDiagram();
  const el = render({processes, flows, groups}, diagram);

  t.equal(el.selectAll('.node')[0].length, 3,
          'right number of nodes');

  t.equal(el.selectAll('.link')[0].length, 2,
          'right number of links');

  t.equal(el.selectAll('.group')[0].length, 2,
          'right number of groups');

  // padding of 10px
  const rects = el.selectAll('.group').select('rect');
  t.equal(d3.select(rects[0][0]).attr('width'), '20', 'group1 width');
  t.equal(d3.select(rects[0][0]).attr('height'), '270', 'group1 height');
  t.equal(d3.select(rects[0][1]).attr('width'), '20', 'group2 width');
  t.equal(d3.select(rects[0][1]).attr('height'), '180', 'group2 height');

  t.end();
});


function render(datum, diagram) {
  const el = d3.select('body').append('div');
  el.datum(datum).call(diagram);
  flushAnimationFrames();
  return el;
}


/* Make animations synchronous for testing */
var flushAnimationFrames = function() {
  var now = Date.now;
  Date.now = function() { return Infinity; };
  d3.timer.flush();
  Date.now = now;
};