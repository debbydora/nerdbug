const RightAside = ({
  notes,
  data,
  handleNotesChange,
  saveNotes,
  deleteNotes,
  saving,
  deleting,
}) => {
  const cityName = data.city;
  const Notes = localStorage.getItem(`notes_${cityName}`);
  return (
    <>
      <div className=" flex flex-col justify-center item text-white p-12 gap-6">
        <textarea
          name="notes"
          value={notes}
          onChange={handleNotesChange}
          className="bg-white rounded-lg outline-none text-black p-4"
          rows={6}
        />
        <div className="flex justify-end gap-x-8">
          <button
            className="bg-[#2B41B4] p-2.5 rounded-lg transition-all duration-[200ms] ease-in-out transform hover:scale-[.98]"
            onClick={() => saveNotes(cityName)}
          >
            {saving ? "Saving ..." : "Save Note"}
          </button>
          <button
            onClick={() => deleteNotes(cityName)}
            className="bg-[#2B41B4] p-2.5 rounded-lg hover:shadow-lg transition-all duration-[200ms] ease-in-out transform hover:scale-[.98]"
          >
            {deleting ? "Deleting ..." : "Delete Note"}
          </button>
        </div>

        <div>{Notes && <p>{Notes}</p>}</div>
      </div>
    </>
  );
};

export default RightAside;
