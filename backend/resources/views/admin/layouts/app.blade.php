<!doctype html>
<html lang="en" data-bs-theme="auto">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Aurora - @yield('title')</title>
        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <!-- Fontawesome CSS -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <!-- Summer note CSS -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-bs5.min.css" integrity="sha512-ngQ4IGzHQ3s/Hh8kMyG4FC74wzitukRMIcTOoKT3EyzFZCILOPF0twiXOQn75eDINUfKBYmzYn2AA8DkAk8veQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <!-- DataTables CSS -->
        <link rel="stylesheet" href="https://cdn.datatables.net/2.0.8/css/dataTables.dataTables.min.css" />
        <!-- Dashboard CSS -->
        <link href="{{asset('css/dashboard.css')}}" rel="stylesheet">

  </head>
  <body>
    <!-- header here -->
    @include('admin.layouts.header')
    <div class="container-fluid">
      <!-- content here -->
    @yield('content')
    </div>
    <!-- Jquery JS -->
    <script
        src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
        crossorigin="anonymous"></script>
    <!-- DataTables JS -->
    <script src="https://cdn.datatables.net/2.0.8/js/dataTables.min.js"></script>
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <!-- Summer note JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote.min.js" integrity="sha512-6rE6Bx6fCBpRXG/FWpQmvguMWDLWMQjPycXMr35Zx/HRD9nwySZswkkLksgyQcvrpYMx0FELLJVBvWFtubZhDQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <!-- Sweet alert js -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    @session('success')
        <script>
            Swal.fire({
                position: "mid",
                icon: "success",
                title: "{{session('success')}}",
                showConfirmButton: false,
                timer: 2500
                });
        </script>
    @endsession
    @session('error')
        <script>
            Swal.fire({
                position: "mid",
                icon: "error",
                title: "{{session('error')}}",
                showConfirmButton: false,
                timer: 2500
                });
        </script>
    @endsession

    <script>
        $(document).ready(function() {
            //datatables
            $('.table').DataTable();
            //summernote
            $('.summernote').summernote();
            //Display summernote dropdown menu
            $('.dropdown-toggle').dropdown();
        });
        function deleteItem(id) {
            Swal.fire({
                title: 'Bạn chăc chắn muốn xóa?',
                text: "Dữ liệu sau khi xóa sẽ không thể khôi phục!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa!'
                }).then((result) => {
                if (result.isConfirmed) {
                    document.getElementById(id).submit();
                }
            });
        }
    </script>
    <script src="{{asset('js/colors.js')}}"></script>
    <script>
        function readUrl(input, image){
            if(input.files && input.files[0]){
                var reader = new FileReader();
                reader.onload = function(e){
                    document.getElementById(image).classList.remove('d-none');
                    document.getElementById(image).setAttribute('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }


        function handleImageInputChanged(input, image){
            document.getElementById(input).addEventListener('change', function(){
                readUrl(this, image);
            })
        }


        handleImageInputChanged('thumbnail', 'thumbnail_preview')
        handleImageInputChanged('author_img', 'author_img_preview');
    </script>
    @yield('scripts')
</html>
