using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DuAN.Models
{
    public class File
    {

        private Guid id;
        private string fileName;
        private int fileSize;
        private string fileExtension;
        private string filePath;

        public Guid Id { get => id; set => id = value; }
        public string FileName { get => fileName; set => fileName = value; }
        public int FileSize { get => fileSize; set => fileSize = value; }
        public string FileExtension { get => fileExtension; set => fileExtension = value; }
        public string FilePath { get => filePath; set => filePath = value; }
    }
}
