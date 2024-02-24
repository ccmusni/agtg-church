import { IService } from "Service";

export default function ServiceItem({ service }: { service: IService }) {
  return (
    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
      <h1 className="h2 mb-4">{service.title}</h1>
      <p className="text-xl text-gray-600">{service.description}</p>
    </div>
  );
}
