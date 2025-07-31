import { lazy, Suspense } from "react";
import Loader from "../../components/loader/Loader";

type ImportComponentFunction<T = React.ComponentType> = () => Promise<{
  default: T;
}>;

// Export helper function for lazy loading components
export const lazyLoadComponent = (importFunc: ImportComponentFunction) => {
  const LazyComponent = lazy(importFunc);

  // Display fallback until component is fully imported
  return (props: any) => (
    <Suspense fallback={<Loader color="darkmagenta" />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
