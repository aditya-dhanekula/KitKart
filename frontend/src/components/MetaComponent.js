import { Helmet, HelmetProvider } from "react-helmet-async";

const MetaComponent = ({ title="KitKart", description="Example Description" }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    </HelmetProvider>
  );
};

export default MetaComponent