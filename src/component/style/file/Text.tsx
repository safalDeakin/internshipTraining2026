import { Box, Boxes, Card, Searchinput, Thing } from "../Button";

const Text = () => {
  return (
    <div style={{ padding: "30px" }}>
      <p>1:Hover &: </p>
      <Thing>Hove here for first thing</Thing>
      <p>2:Thing after thing &~&</p>
      <Thing>first </Thing>
      <Thing>second</Thing>
      <p>2:Thing immediateafter thing &+&</p>
      <Thing>first </Thing>
      <Thing>second</Thing>
      <p>3:use className inside Thing</p>
      <Thing className="something">classANme style </Thing>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed sequi saepe
        enim ad quo omnis debitis accusantium obcaecati architecto sint nam eum
        optio ipsum totam exercitationem, cum necessitatibus vero veritatis.
      </div>
      <div className="something-else">
        <Thing>insde something else</Thing>
      </div>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus
        hic non quas beatae fuga obcaecati molestias perspiciatis, magni labore
        maiores vel voluptas voluptatum omnis nobis minus placeat, animi quae
        repellat!
      </p>
      <Searchinput type="text" placeholder="search..." />

      <div>
        <h1>ANIMATED</h1>
        <Card>
          <h1>ANIMATE CARD</h1>
        </Card>
        <Box />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum,
          adipisci quod! Quasi reprehenderit expedita laboriosam id laudantium
          qui, modi aspernatur adipisci beatae odit, cum voluptatem ab tempora,
          unde deleniti molestias.
        </p>
        <Boxes />
      </div>
    </div>
  );
};

export default Text;
