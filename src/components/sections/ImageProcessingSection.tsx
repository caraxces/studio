'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ImageProcessingSection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setProcessedImageUrl(null);
      setError(null);
    }
  };

  const handleProcessImage = async () => {
    if (!selectedFile) {
      setError('Please select an image file.');
      return;
    }

    setLoading(true);
    setError(null);
    setProcessedImageUrl(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/process-image/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Image processing failed.');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setProcessedImageUrl(url);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="image-processing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Image Processing
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Upload an image to resize and compress it.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <div className="flex flex-col items-center space-y-2">
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              <Button onClick={handleProcessImage} disabled={!selectedFile || loading}>
                {loading ? 'Processing...' : 'Process Image'}
              </Button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {processedImageUrl && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Processed Image:</h3>
                <img src={processedImageUrl} alt="Processed" className="max-w-full h-auto" />
                <a
                  href={processedImageUrl}
                  download={`processed_${selectedFile?.name || 'image'}`}
                  className="inline-block mt-2 text-primary hover:underline"
                >
                  Download Processed Image
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageProcessingSection;