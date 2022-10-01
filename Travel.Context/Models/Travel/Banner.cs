using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.Models
{
    public class Banner
    {
        private int id;
        private int idImage;
        private bool isActive;

        public int Id { get => id; set => id = value; }
        public int IdImage { get => idImage; set => idImage = value; }
        public bool IsActive { get => isActive; set => isActive = value; }
    }
}
