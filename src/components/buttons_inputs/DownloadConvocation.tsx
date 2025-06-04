import Button from '@components/buttons_inputs/Button';
import { Download } from '@components/icons';

interface DownloadConvocationProps {
  fileName: string;
  label: string;
}

const DownloadConvocation: React.FC<DownloadConvocationProps> = ({ fileName, label }) => (
  <div className="mb-6 flex items-center gap-4">
    <p className="text-lg text-gray-700">
      Descarga la convocatoria ({label}) requerida para el registro:
    </p>
    <Button
      label={`Descargar ${label}`}
      variant="primary"
      showLeftIcon
      IconLeft={Download}
      type="button"
      href={`/${fileName}`}
      className="px-4 py-2 rounded flex items-center"
    />
  </div>
);

export default DownloadConvocation;