import Bests from "./components/Bests";
import PopularComparisons from "../Compare/components/PopularComparisons";
import CompareForm from "../Compare/components/CompareForm";
import YoutubeVideos from "./components/YoutubeVideos";

const Home = (props) => {
  const setIds = props.setIds;
  const Ids = props.Ids;

  return (
    <div>
      <section className="mt-5">
        <div className="container d-flex">
          <div className="col-12 col-md-12 col-lg-9">
            <Bests setIds={setIds} Ids={Ids} />
            <YoutubeVideos/>
          </div>
          <div className="col-12 col-md-12 col-lg-3" style={{marginTop:"68px"}}>
             <div className="card d-none d-lg-block text-center">
              <div className="card-body" style={{padding:"20px"}}>
                  <CompareForm/>
              </div>
             </div>
             <div className="d-none d-lg-block">
             <PopularComparisons/>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
