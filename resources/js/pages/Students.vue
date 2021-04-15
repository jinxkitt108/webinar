<template>
  <div class="container">
    <h3 class="my-4">Student Page</h3>

    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#exampleModal"
      @click="
        student_form.reset();
        edit_mode = false;
      "
    >
      Add Student
    </button>

    <!-- Add Student Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ edit_mode ? "Editing Student" : "Add Student" }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <form @submit.prevent="edit_mode ? updateStudent() : addStudent()">
              <div class="form-group">
                <label for="exampleInputEmail1">Full Name</label>
                <input
                  v-model="student_form.name"
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter name"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Email</label>
                <input
                  type="email"
                  v-model="student_form.email"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Email"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Course</label>
                <input
                  type="text"
                  v-model="student_form.course"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Course"
                />
              </div>
              <div class="text-right">
                <button type="submit" class="btn btn-primary">Submit</button>
                <button
                  id="close_modal"
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-header">
        <h3 class="card-title">Students Table</h3>
      </div>
      <!-- /.card-header -->
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th style="width: 10px">#id</th>
              <th>Name</th>
              <th>Email</th>
              <th style="width: 40px">Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in students" :key="student.id">
              <td>{{ student.id }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.email }}</td>
              <td>{{ student.course }}</td>
              <td>
                <button
                  class="btn btn-primary btn-sm"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  @click="editing(student)"
                >
                  Edit
                </button>

                <button
                  @click="deleteStudent(student.id)"
                  class="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- /.card-body -->
      <div class="card-footer clearfix"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      student_form: new Form({
        id: "",
        name: "",
        email: "",
        course: "",
      }),

      students: [],
      edit_mode: false,
    };
  },

  methods: {
    editing(student) {
      this.edit_mode = true;
      console.log("test");
      this.student_form.fill(student);
    },

    addStudent() {
      axios.post("/api/students", this.student_form).then(() => {
        document.getElementById("close_modal").click();
        this.getAllStudents();
      });
    },

    getAllStudents() {
      axios.get("api/students").then((result) => {
        this.students = result.data;
      });
    },

    updateStudent() {
      axios
        .put("api/students/" + this.student_form.id, this.student_form)
        .then(() => {
          document.getElementById("close_modal").click();
          this.getAllStudents();
        });
    },

    deleteStudent(id) {
      axios.delete("api/students/" + id).then(() => {
        this.getAllStudents();
      });
    },
  },

  created() {
    this.getAllStudents();
  },
};
</script>